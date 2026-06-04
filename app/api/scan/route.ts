import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getAIProvider } from '@/lib/ai'
import { stripExif } from '@/lib/utils/exif-strip'
import { hashIp, getIpFromRequest } from '@/lib/utils/ip-hash'
import { createHash } from 'crypto'

function hashContent(input: { kind: string; text?: string; data?: Buffer }): string {
  const h = createHash('sha256')
  if (input.kind === 'text' && input.text) {
    h.update(input.text.toLowerCase().trim())
  } else if (input.kind === 'image' && input.data) {
    h.update(input.data)
  }
  return h.digest('hex')
}

const PATTERN_THRESHOLD = 5 // na 5 meldingen = bekende scam

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/heic', 'image/heif']
const MAX_SIZE = 10 * 1024 * 1024 // 10 MB
const ANON_MONTHLY_LIMIT = 3
const FREE_MONTHLY_LIMIT = 5

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const locale = (request.headers.get('x-locale') ?? 'nl') as 'nl' | 'en'

    // --- Rate limiting ---
    if (!user) {
      const ipHash = hashIp(getIpFromRequest(request))
      const { data: rl } = await supabase
        .from('rate_limits')
        .select('scans_this_month, reset_at')
        .eq('ip_hash', ipHash)
        .single()

      const now = new Date()
      if (rl && new Date(rl.reset_at) > now && rl.scans_this_month >= ANON_MONTHLY_LIMIT) {
        return NextResponse.json(
          { error: 'Maandlimiet bereikt. Maak een gratis account aan voor meer scans.' },
          { status: 429 }
        )
      }

      // Upsert rate limit
      await supabase.from('rate_limits').upsert({
        ip_hash: ipHash,
        scans_this_month: (rl?.scans_this_month ?? 0) + 1,
        reset_at: new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString(),
      })
    } else {
      // Gratis gebruikers hebben ook een limiet
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('tier')
        .eq('user_id', user.id)
        .single()

      if (sub?.tier === 'free') {
        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        startOfMonth.setHours(0, 0, 0, 0)

        const { count } = await supabase
          .from('scans')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .gte('created_at', startOfMonth.toISOString())

        if ((count ?? 0) >= FREE_MONTHLY_LIMIT) {
          return NextResponse.json(
            { error: 'Maandlimiet bereikt. Upgrade naar Standaard voor onbeperkte scans.' },
            { status: 429 }
          )
        }
      }
    }

    // --- Input verwerken ---
    const contentType = request.headers.get('content-type') ?? ''
    let input: Parameters<ReturnType<typeof getAIProvider>['scan']>[0]

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const file = formData.get('file') as File | null

      if (!file) {
        return NextResponse.json({ error: 'Geen bestand ontvangen.' }, { status: 400 })
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: 'Bestandstype niet ondersteund. Gebruik PNG, JPG, HEIC of WebP.' },
          { status: 400 }
        )
      }
      if (file.size > MAX_SIZE) {
        return NextResponse.json({ error: 'Bestand te groot. Maximum is 10 MB.' }, { status: 400 })
      }

      const arrayBuffer = await file.arrayBuffer()
      const buffer = await stripExif(Buffer.from(arrayBuffer), file.type)

      input = { kind: 'image', data: buffer, mimeType: file.type, locale }
    } else {
      const { text } = await request.json()
      if (!text?.trim()) {
        return NextResponse.json({ error: 'Geen tekst ontvangen.' }, { status: 400 })
      }
      if (text.length > 2000) {
        return NextResponse.json(
          { error: 'Tekst te lang. Maximum is 2000 tekens.' },
          { status: 400 }
        )
      }
      input = { kind: 'text', text: text.trim(), locale }
    }

    // --- Check bekende scam-patterns ---
    const contentHash = hashContent(
      input.kind === 'text'
        ? { kind: 'text', text: (input as { text: string }).text }
        : { kind: 'image', data: (input as { data: Buffer }).data }
    )

    const { data: knownPattern } = await supabase
      .from('scam_patterns')
      .select(
        'verdict_category, verdict_score, verdict_summary, verdict_flags, fraud_type, report_count'
      )
      .eq('content_hash', contentHash)
      .single()

    // Unieke reporter fingerprint — user_id heeft voorrang over ip
    const reporterFingerprint = user?.id ?? hashIp(getIpFromRequest(request))

    if (knownPattern && knownPattern.report_count >= PATTERN_THRESHOLD) {
      // Bekende scam — geen AI-call nodig
      const verdict = {
        category: knownPattern.verdict_category as 'safe' | 'doubt' | 'phishing',
        score: knownPattern.verdict_score,
        summary: knownPattern.verdict_summary ?? '',
        flags: knownPattern.verdict_flags ?? [],
        fraudType: knownPattern.fraud_type,
        knownScam: true,
        reportCount: knownPattern.report_count,
      }

      // Alleen tellen als nieuwe unieke reporter (insert faalt bij duplicaat)
      const { error: dupError } = await supabase
        .from('scam_pattern_reporters')
        .insert({ content_hash: contentHash, reporter_fingerprint: reporterFingerprint })

      if (!dupError) {
        await supabase
          .from('scam_patterns')
          .update({
            report_count: knownPattern.report_count + 1,
            last_seen_at: new Date().toISOString(),
          })
          .eq('content_hash', contentHash)
      }

      const ipHash = user ? null : hashIp(getIpFromRequest(request))
      await supabase.from('scans').insert({
        user_id: user?.id ?? null,
        ip_hash: ipHash,
        input_kind: input.kind,
        verdict_category: verdict.category,
        verdict_score: verdict.score,
        verdict_summary: verdict.summary,
        verdict_flags: verdict.flags,
        fraud_type: verdict.fraudType ?? null,
        locale,
        ai_provider: 'pattern',
        ai_model: 'known_scam',
        scan_duration_ms: 0,
      })

      return NextResponse.json({ verdict })
    }

    // --- AI analyse ---
    const ai = getAIProvider()
    const verdict = await ai.scan(input)

    // --- Opslaan in database ---
    const ipHash = user ? null : hashIp(getIpFromRequest(request))
    await supabase.from('scans').insert({
      user_id: user?.id ?? null,
      ip_hash: ipHash,
      input_kind: input.kind,
      verdict_category: verdict.category,
      verdict_score: verdict.score,
      verdict_summary: verdict.summary,
      verdict_flags: verdict.flags,
      fraud_type: verdict.fraudType ?? null,
      locale,
      ai_provider: 'mistral',
      ai_model: verdict.model,
      scan_duration_ms: verdict.durationMs,
    })

    // --- Scam pattern bijwerken (alleen unieke reporters) ---
    if (verdict.category === 'phishing' || verdict.category === 'doubt') {
      // Probeer reporter in te voegen — faalt bij duplicaat
      const { error: dupError } = await supabase
        .from('scam_pattern_reporters')
        .insert({ content_hash: contentHash, reporter_fingerprint: reporterFingerprint })

      if (!dupError) {
        // Nieuwe unieke reporter — pattern updaten of aanmaken
        const { data: existing } = await supabase
          .from('scam_patterns')
          .select('id, report_count')
          .eq('content_hash', contentHash)
          .single()

        if (existing) {
          await supabase
            .from('scam_patterns')
            .update({
              report_count: existing.report_count + 1,
              last_seen_at: new Date().toISOString(),
            })
            .eq('content_hash', contentHash)
        } else {
          await supabase.from('scam_patterns').insert({
            content_hash: contentHash,
            input_kind: input.kind,
            verdict_category: verdict.category,
            verdict_score: verdict.score,
            verdict_summary: verdict.summary,
            verdict_flags: verdict.flags,
            fraud_type: verdict.fraudType ?? null,
          })
        }
      }
    }

    return NextResponse.json({ verdict })
  } catch (err) {
    console.error('[scan] fout:', err)
    return NextResponse.json({ error: 'Er ging iets mis. Probeer het opnieuw.' }, { status: 500 })
  }
}

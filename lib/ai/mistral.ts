import { Mistral } from '@mistralai/mistralai'
import type { AIProvider, ScanInput, Verdict } from './provider'
import { getCategory } from './provider'
import { systemPrompt as systemNL, userPrompt as userNL } from './prompts/nl'
import { systemPrompt as systemEN, userPrompt as userEN } from './prompts/en'

const MODEL = 'pixtral-large-latest'

export class MistralProvider implements AIProvider {
  private client: Mistral

  constructor() {
    this.client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY! })
  }

  async scan(input: ScanInput): Promise<Verdict> {
    const start = Date.now()
    const isNL = input.locale === 'nl'
    const system = isNL ? systemNL : systemEN
    const userText = isNL ? userNL(input.kind) : userEN(input.kind)

    const messages: Parameters<typeof this.client.chat.complete>[0]['messages'] = [
      { role: 'system', content: system },
    ]

    if (input.kind === 'image') {
      const base64 = input.data.toString('base64')
      messages.push({
        role: 'user',
        content: [
          {
            type: 'image_url',
            imageUrl: { url: `data:${input.mimeType};base64,${base64}` },
          },
          { type: 'text', text: userText },
        ],
      })
    } else {
      messages.push({
        role: 'user',
        content: `${userText}\n\nBericht:\n"${input.text}"`,
      })
    }

    const response = await this.client.chat.complete({
      model: MODEL,
      messages,
      responseFormat: { type: 'json_object' },
      temperature: 0.1,
    })

    const raw = response.choices?.[0]?.message?.content ?? '{}'
    const parsed = JSON.parse(typeof raw === 'string' ? raw : JSON.stringify(raw))

    const score = Math.max(0, Math.min(10, Math.round(Number(parsed.score) || 0)))

    return {
      score,
      category: getCategory(score),
      summary: parsed.summary ?? '',
      flags: Array.isArray(parsed.flags) ? parsed.flags : [],
      fraudType: parsed.fraudType,
      learnMoreSlug: parsed.learnMoreSlug,
      model: MODEL,
      durationMs: Date.now() - start,
    }
  }
}

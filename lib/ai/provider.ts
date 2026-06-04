export type ScanInput =
  | { kind: 'image'; data: Buffer; mimeType: string; locale: 'nl' | 'en' }
  | { kind: 'text'; text: string; locale: 'nl' | 'en' }

export interface VerdictFlag {
  label: string
  severity: 'info' | 'warn' | 'danger'
}

export interface Verdict {
  score: number
  category: 'safe' | 'doubt' | 'phishing'
  summary: string
  flags: VerdictFlag[]
  fraudType?: string
  learnMoreSlug?: string
  model: string
  durationMs: number
  knownScam?: boolean
  reportCount?: number
}

export interface AIProvider {
  scan(input: ScanInput): Promise<Verdict>
}

export function getCategory(score: number): 'safe' | 'doubt' | 'phishing' {
  if (score <= 3) return 'safe'
  if (score <= 6) return 'doubt'
  return 'phishing'
}

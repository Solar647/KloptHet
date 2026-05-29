import type { AIProvider } from './provider'
import { MistralProvider } from './mistral'

export { getCategory } from './provider'
export type { Verdict, VerdictFlag, ScanInput } from './provider'

let _provider: AIProvider | null = null

export function getAIProvider(): AIProvider {
  if (_provider) return _provider
  _provider = new MistralProvider()
  return _provider
}

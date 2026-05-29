import sharp from 'sharp'

export async function stripExif(buffer: Buffer, _mimeType: string): Promise<Buffer> {
  try {
    return await sharp(buffer)
      .rotate() // EXIF-rotatie toepassen en daarna EXIF verwijderen
      .toBuffer()
  } catch {
    return buffer
  }
}

export function anonymizeFilename(): string {
  return `scan_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

import { createHash } from 'crypto'

export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? 'klopthet'
  return createHash('sha256')
    .update(ip + salt)
    .digest('hex')
    .slice(0, 32)
}

export function getIpFromRequest(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return 'unknown'
}

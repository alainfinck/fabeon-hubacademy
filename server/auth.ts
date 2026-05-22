import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'

const SALT_LEN = 16
const KEY_LEN = 64

export function hashPassword(password: string): string {
  const salt = randomBytes(SALT_LEN).toString('hex')
  const hash = scryptSync(password, salt, KEY_LEN).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  try {
    const hashBuf = Buffer.from(hash, 'hex')
    const test = scryptSync(password, salt, KEY_LEN)
    return timingSafeEqual(hashBuf, test)
  } catch {
    return false
  }
}

export function createSessionToken(): string {
  return randomBytes(32).toString('hex')
}

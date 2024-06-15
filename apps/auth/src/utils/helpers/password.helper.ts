import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'

const keyLength = 64

export function hashPassword(password: string) {
  return new Promise<string>((resolve, reject) => {
    const salt = randomBytes(32).toString('hex')

    return scrypt(password, salt, keyLength, (error, derivedKey) => {
      if (error) return reject(error)
      resolve(`${salt}:${derivedKey.toString('hex')}`)
    })
  })
}

export function comparePassword(input: string, hash: string) {
  return new Promise<boolean>((resolve, reject) => {
    const [salt, hashKey] = hash.split(':')
    if (!salt || !hashKey) return reject(new Error('Password hash corrupted'))

    const haskeyBuffer = Buffer.from(hashKey, 'hex')
    scrypt(input, salt, keyLength, (error, derivedKey) => {
      if (error) return reject(error)
      resolve(timingSafeEqual(haskeyBuffer, derivedKey))
    })
  })
}

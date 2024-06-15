import crypto from 'node:crypto'

import { env } from '#/configs'

import { TokenError } from '../errors'

type HashAlgorithmType = 'HS256' | 'HS384' | 'HS512'

type TokenOptions = {
  alg?: HashAlgorithmType
  exp?: number
}

type Payload = Record<string, unknown>

type TokenPayload = Payload & {
  exp?: number
  iat?: number
}

type Header = {
  alg: HashAlgorithmType
  typ: string
}

function getHeaderAlgorithm(alg: HashAlgorithmType) {
  if (alg === 'HS512') return 'sha512'
  if (alg === 'HS384') return 'sha384'
  return 'sha256'
}

export function signToken(
  payload: Payload,
  options: TokenOptions = {}
): string {
  const header: Header = { alg: options.alg || 'HS256', typ: 'JWT' }
  const iat = Math.floor(Date.now() / 1000)
  const exp = options.exp ? iat + options.exp : iat + 3600

  const tokenPayload: TokenPayload = { ...payload, iat, exp }

  const headerB64 = Buffer.from(JSON.stringify(header)).toString('base64url')
  const payloadB64 = Buffer.from(JSON.stringify(tokenPayload)).toString(
    'base64url'
  )
  const data = `${headerB64}.${payloadB64}`
  const signature = crypto
    .createHmac(getHeaderAlgorithm(header.alg), env.TOKEN_SECRET_KEY)
    .update(data)
    .digest('base64url')

  return `${data}.${signature}`
}

export function verifyToken<T = unknown>(
  token: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validatePayload?: (payload: any) => T
): T {
  const [headerB64, payloadB64, signature] = token.split('.')

  if (!headerB64 || !payloadB64 || !signature) {
    throw new TokenError('invalidTokenFormat', token)
  }

  const data = `${headerB64}.${payloadB64}`
  const header: Header = JSON.parse(
    Buffer.from(headerB64, 'base64url').toString('utf8')
  )

  const expectedSignature = crypto
    .createHmac(getHeaderAlgorithm(header.alg), env.TOKEN_SECRET_KEY)
    .update(data)
    .digest('base64url')

  if (expectedSignature !== signature) {
    throw new TokenError('invalidTokenSignature', token)
  }

  const payload = JSON.parse(
    Buffer.from(payloadB64, 'base64url').toString('utf8')
  )

  const currentTime = Math.floor(Date.now() / 1000)
  if (payload.exp && currentTime > payload.exp) {
    throw new TokenError('tokenHasExpired', token)
  }

  if (payload.iat && currentTime < payload.iat) {
    throw new TokenError('tokenUsedBeforeIssued', token)
  }

  if (validatePayload) {
    return validatePayload(payload)
  }

  return payload as T
}

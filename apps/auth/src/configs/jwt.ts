import { createSigner } from 'fast-jwt'

import environment from './env'

const tokenSigner = createSigner({
  algorithm: 'HS512',
  key: environment.TOKEN_SECRET_KEY,
  expiresIn: 15 * 60 * 1000 // 15 minutes in milliseconds
})

export function signToken<TPayload extends string | Record<string, unknown>>(payload: TPayload) {
  return tokenSigner(payload)
}
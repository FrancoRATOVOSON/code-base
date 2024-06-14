import { addDays } from 'date-fns'
import crypto from 'node:crypto'

import { signToken } from '#/configs'

import { GeneratedSessionType } from '../types'
import { HttpErrorType, ResponseErrorType } from '../types/lib'

export function generateSession(): GeneratedSessionType {
  const id = crypto.randomBytes(128).toString('base64')
  const expirationDate = addDays(Date.now(), 7)

  return { id, expirationDate }
}

export function generateToken<T extends Record<string, unknown>>(
  parameters: T
) {
  return signToken(parameters)
}

export function createResponseError(
  error: HttpErrorType,
  message: string
): ResponseErrorType {
  return {
    ...error,
    message
  }
}

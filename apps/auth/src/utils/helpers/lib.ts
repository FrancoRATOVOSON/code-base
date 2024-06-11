import { addDays } from 'date-fns'
import crypto from 'node:crypto'

import { GeneratedSessionType } from '../types'
import { HttpErrorType, ResponseErrorType } from '../types/lib'

import { signToken } from './jwt'

export function generateSession(): GeneratedSessionType {
  const id = crypto.randomBytes(128).toString('base64')
  const expirationDate = addDays(Date.now(), 7)

  return { id, expirationDate }
}

export function generateToken<T extends string | Record<string, unknown>>(params: T) {
  return signToken(params)
}


export function createResponseError(error:HttpErrorType, message: string): ResponseErrorType {
  return {
    ...error,
    message
  }
}

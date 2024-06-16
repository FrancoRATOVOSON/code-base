import { FastifyBaseLogger, FastifyError } from 'fastify'

import { addDays } from 'date-fns'
import crypto from 'node:crypto'

import { httpErrors } from '../constants'
import { PayloadError } from '../errors'
import { GeneratedSessionType } from '../types'
import { HttpErrorType, ResponseErrorType } from '../types/lib'

export function generateSession(): GeneratedSessionType {
  const id = crypto.randomBytes(128).toString('base64')
  const expirationDate = addDays(Date.now(), 7)

  return { id, expirationDate }
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

export function getResponseFromError(
  logger: FastifyBaseLogger,
  error: FastifyError
) {
  const errorMessage = error.message

  if (error instanceof PayloadError) {
    logger.error(error.getLogMessage())
    logger.debug(error)
    return createResponseError(httpErrors.badRequest, errorMessage)
  }

  return createResponseError(httpErrors.internalServerError, errorMessage)
}

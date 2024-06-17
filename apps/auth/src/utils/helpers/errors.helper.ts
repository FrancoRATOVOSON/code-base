import { FastifyBaseLogger, FastifyError } from 'fastify'

import { ZodError } from 'zod'

import { httpErrors } from '../constants'
import {
  PasswordError,
  PayloadError,
  PayloadTypeError,
  TokenError
} from '../errors'
import { HttpErrorType, ResponseErrorType } from '../types'

export function createResponseError(
  error: HttpErrorType,
  message: string
): ResponseErrorType {
  return {
    ...error,
    message
  }
}

function handleZodError(error: ZodError) {
  const errorFields = error.errors
  const passwordErrors: Array<{ error: string }> = []
  const typeErrors: Array<{ field: string; error: string }> = []

  for (const errorItem of errorFields) {
    if (
      errorItem.path.includes('password') &&
      errorItem.code !== 'invalid_type'
    ) {
      passwordErrors.push({ error: errorItem.message })
      break
    } else
      typeErrors.push({
        field: errorItem.path.join('.'),
        error: errorItem.message
      })
  }

  if (passwordErrors.length > 0)
    return new PasswordError(passwordErrors[0].error)

  return new PayloadTypeError(typeErrors[0].error, {
    field: typeErrors[0].field
  })
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

  if (error instanceof TokenError)
    return createResponseError(httpErrors.unauthorized, errorMessage)

  if (error instanceof ZodError) {
    const currentError = handleZodError(error)
    return createResponseError(httpErrors.badRequest, currentError.message)
  }

  logger.debug(error)
  return createResponseError(httpErrors.internalServerError, errorMessage)
}

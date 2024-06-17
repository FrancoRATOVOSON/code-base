import { FastifyBaseLogger, FastifyError } from 'fastify'

import { ZodError } from 'zod'

import { errorMessages, httpErrors } from '../constants'
import { PayloadError, TokenError } from '../errors'
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
    const errorFields = error.errors
      .map(zodError => zodError.path.join('.'))
      // eslint-disable-next-line unicorn/no-array-reduce
      .reduce<string[]>((array, current) => {
        if (array.at(-1) !== current) array.push(current)
        return array
      }, [])
    const payloadError = new PayloadError(errorMessages.invalidPayload, {
      fields: errorFields
    })
    logger.error(payloadError.getLogMessage())
    logger.debug(error)
    return createResponseError(httpErrors.badRequest, payloadError.message)
  }

  logger.debug(error)
  return createResponseError(httpErrors.internalServerError, errorMessage)
}

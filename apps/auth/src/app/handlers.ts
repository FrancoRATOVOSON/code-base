import { FastifyBaseLogger, FastifyError } from 'fastify'

import { httpErrors } from '#/utils/constants'
import { PayloadError } from '#/utils/errors'
import { createResponseError } from '#/utils/helpers'

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

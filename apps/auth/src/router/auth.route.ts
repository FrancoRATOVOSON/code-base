import { FastifyInstance } from 'fastify'

import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { createSession } from '#/controllers'
import { createSessionBodySchema, createSessionResponseSchema, responseErrorSchema } from '#/schema'
import { httpErrors, httpSuccess } from '#/utils/constants'
import { PayloadError } from '#/utils/errors'
import { createResponseError } from '#/utils/helpers'

// eslint-disable-next-line functional/prefer-immutable-types
async function AuthRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/login',
    schema: {
      body: createSessionBodySchema,
      response: {
        201: createSessionResponseSchema.describe('Session created'),
        400: responseErrorSchema
      }
    },
    attachValidation: true,
    async handler(request, rep) {
      const result = await createSession(request.body)
      if(result instanceof PayloadError) {
        const error = createResponseError(httpErrors.badRequest,result.message)
        rep.status(error.code).send(error)
        fastify.log.error(result.getLogMessage())
        return
      }
      rep.status(httpSuccess.created).send(result)
    }
  })
}

export default AuthRoute

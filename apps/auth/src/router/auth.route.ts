import { FastifyInstance } from 'fastify'

import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { createSession } from '#/controllers'
import { createSessionBodySchema, createSessionResponseSchema, responseErrorSchema } from '#/schema'
import { httpSuccess } from '#/utils/constants'

// eslint-disable-next-line functional/prefer-immutable-types
async function AuthRoute(fastify: FastifyInstance) {
  // eslint-disable-next-line functional/no-expression-statements
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
      const token = await createSession(request.body)
      // eslint-disable-next-line functional/no-expression-statements
      rep.status(httpSuccess.created).send(token)
    }
  })
}

export default AuthRoute

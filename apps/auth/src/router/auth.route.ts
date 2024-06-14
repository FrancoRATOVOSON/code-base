import { FastifyInstance } from 'fastify'

import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { createSession } from '#/controllers'
import {
  createSessionBodySchema,
  createSessionResponseSchema,
  responseErrorSchema
} from '#/schema'
import { httpSuccess } from '#/utils/constants'

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
      rep.status(httpSuccess.created).send(result)
    }
  })
}

export default AuthRoute

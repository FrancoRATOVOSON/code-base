import { FastifyInstance } from 'fastify'

import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { createSession } from '#/controllers'
import { createSessionBodySchema, createSessionResponseSchema } from '#/schema'

export default async function (fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/login',
    schema: {
      body: createSessionBodySchema,
      response: {
        201: createSessionResponseSchema.describe('Session created')
      }
    },
    async handler(req, rep) {
      const token = await createSession(req.body)
      rep.status(201).send(token)
    }
  })
}

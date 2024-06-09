import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { FastifyInstance } from 'fastify'
import { createSessionBodySchema, createSessionResponseSchema } from '../schema'
import { createSession } from '../controllers'

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
      const session = req.body
      const token = await createSession(session)
      rep.status(201).send(token)
    }
  })
}

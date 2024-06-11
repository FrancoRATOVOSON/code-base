import { FastifyInstance } from 'fastify'

import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ZodError } from 'zod'

import { createSession } from '#/controllers'
import { createSessionBodySchema, createSessionResponseSchema, responseErrorSchema } from '#/schema'
import { createResponseError, httpErrors, httpSuccess } from '#/utils/helpers'

export default async function (fastify: FastifyInstance) {
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
    async handler(req, rep) {
      if (req.validationError) {
        let errorMessage: string
        if (req.validationError instanceof ZodError)
          errorMessage = req.validationError.issues[0].message
        else errorMessage = 'An unknown validation error occured'
        const error = createResponseError(httpErrors.badRequest, errorMessage)
        rep.status(error.code).send(error)
        return
      }
      const token = await createSession(req.body)
      rep.status(httpSuccess.created).send(token)
    }
  })
}

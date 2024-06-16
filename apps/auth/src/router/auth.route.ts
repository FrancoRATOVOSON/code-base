import { FastifyInstance } from 'fastify'

import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { createSession, disableSession } from '#/controllers'
import { createSessionBodySchema, createSessionResponseSchema } from '#/schema'
import {
  createErrorResponseSchema,
  emptyResponseSchema
} from '#/schema/utils.schema'
import { errorMessages, httpErrors, httpSuccess } from '#/utils/constants'
import { createResponseError } from '#/utils/helpers'

async function AuthRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/login',
    schema: {
      body: createSessionBodySchema,
      response: {
        201: createSessionResponseSchema.describe('Session created'),
        400: createErrorResponseSchema(httpErrors.badRequest)
      }
    },
    attachValidation: true,
    async handler(request, rep) {
      const result = await createSession(request.body)
      rep.status(httpSuccess.created).send(result)
    }
  })

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/logout',
    schema: {
      security: [{ cookieAuth: [] }, { bearerAuth: [] }],
      response: {
        200: emptyResponseSchema.describe('Session destroyed'),
        400: createErrorResponseSchema(httpErrors.badRequest),
        403: createErrorResponseSchema(httpErrors.forbidden)
      }
    },
    attachValidation: true,
    // preHandler(request, rep, done) {
    //   const result = cookieAuthSchema.safeParse(request.cookies)
    //   if (!result.success) {
    //     const error = createResponseError(
    //       httpErrors.forbidden,
    //       errorMessages.unrecognizedSession
    //     )
    //     return rep.status(error.code).send(error)
    //   }
    //   done()
    // },
    async handler(request, rep) {
      const sessionId = request.cookies.sessionId
      const requestAuth = request.headers.authorization

      if (!requestAuth) {
        const error = createResponseError(
          httpErrors.forbidden,
          errorMessages.unrecognizedSession
        )
        return rep.status(error.code).send(error)
      }

      const token = requestAuth.split(' ')[1]
      if (!token) {
        const error = createResponseError(
          httpErrors.forbidden,
          errorMessages.unrecognizedSession
        )
        return rep.status(error.code).send(error)
      }

      await disableSession(sessionId!, token)
      rep.status(httpSuccess.ok)
    }
  })
}

export default AuthRoute

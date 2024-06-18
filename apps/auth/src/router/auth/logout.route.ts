import { createErrorResponseSchema, emptyResponseSchema } from '#/schema'
import { logoutSession } from '#/services'
import { errorMessages, httpErrors, httpSuccess } from '#/utils/constants'
import { PayloadError } from '#/utils/errors'
import { createResponseError, verifyToken } from '#/utils/helpers'
import { CreateRouteObjectFunctionType } from '#/utils/types'

const createLogoutRoute: CreateRouteObjectFunctionType = fastify => ({
  method: 'POST',
  url: '/logout',
  schema: {
    security: [{ cookieAuth: [], bearerAuth: [] }],
    response: {
      200: emptyResponseSchema.describe('Session destroyed'),
      400: createErrorResponseSchema(httpErrors.badRequest),
      403: createErrorResponseSchema(httpErrors.forbidden)
    }
  },
  attachValidation: true,

  onRequest: fastify.auth(
    [
      fastify.verifySession,
      ...(fastify.verifyBearerAuth ? [fastify.verifyBearerAuth] : [])
    ],
    {
      relation: 'and',
      run: 'all'
    }
  ),

  // preHandler(request, rep, done) {
  //   const cookies = cookieAuthSchema.safeParse(request.cookies)

  //   if (!cookies.success) {
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

    if (!sessionId) {
      const error = createResponseError(
        httpErrors.forbidden,
        errorMessages.unrecognizedSession
      )
      return rep.status(error.code).send(error)
    }

    if (!requestAuth) {
      const error = createResponseError(
        httpErrors.forbidden,
        'No request authorization'
      )
      return rep.status(error.code).send(error)
    }

    const token = requestAuth.split(' ')[1]
    if (!token) {
      const error = createResponseError(httpErrors.forbidden, 'No token')
      return rep.status(error.code).send(error)
    }
    const tokenPayload = verifyToken<{ id: string }>(token)
    if (!tokenPayload.id)
      throw new PayloadError(errorMessages.invalidTokenPayload, {
        fields: ['id']
      })

    await logoutSession(sessionId, tokenPayload.id)
    rep.status(httpSuccess.ok)
  }
})

export default createLogoutRoute

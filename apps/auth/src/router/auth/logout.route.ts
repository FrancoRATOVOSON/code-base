import { createErrorResponseSchema, emptyResponseSchema } from '#/schema'
import { getSessionOwner, logoutSession } from '#/services'
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

  onRequest: fastify.auth([fastify.verifySession, fastify.verifyToken], {
    relation: 'and',
    run: 'all'
  }),

  async handler(request, rep) {
    const sessionId = request.cookies.sessionId!
    const requestAuth = request.headers.authorization!

    const token = requestAuth.split(' ')[1]
    const tokenPayload = verifyToken<{ id: string }>(token)
    if (!tokenPayload.id)
      throw new PayloadError(errorMessages.invalidTokenPayload, {
        fields: ['id']
      })

    const sessionUser = await getSessionOwner(sessionId)

    if (!sessionUser || sessionUser.userId !== tokenPayload.id) {
      const error = createResponseError(
        httpErrors.forbidden,
        errorMessages.unrecognizedSession
      )
      return rep.status(error.code).send(error)
    }

    await logoutSession(sessionId, tokenPayload.id)
    rep.status(httpSuccess.ok)
  }
})

export default createLogoutRoute

import {
  createErrorResponseSchema,
  createSessionBodySchema,
  createSessionResponseSchema
} from '#/schema'
import { createNewSession, createOrUpdateDevice } from '#/services'
import { httpErrors, httpSuccess } from '#/utils/constants'
import { generateSession, signToken } from '#/utils/helpers'
import {
  CreateSessionParams,
  CreateSessionReturnType,
  RouteType
} from '#/utils/types'

const loginRoute: RouteType<{
  Body: CreateSessionParams
  Reply: CreateSessionReturnType
}> = {
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
    if (request.validationError) throw request.validationError
    const { device, user } = request.body

    const session = generateSession()
    const { id: deviceId } = await createOrUpdateDevice(device)
    const { userId } = await createNewSession(session, user, { deviceId })
    const userToken = signToken({ id: userId })

    rep
      .status(httpSuccess.created)
      .send({ sessionId: session.id, deviceId, userId, userToken })
  }
}

export default loginRoute

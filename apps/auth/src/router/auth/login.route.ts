import {
  createErrorResponseSchema,
  createSessionBodySchema,
  createSessionResponseSchema
} from '#/schema'
import { createNewSession, createOrUpdateDevice } from '#/services'
import { errorMessages, httpErrors, httpSuccess } from '#/utils/constants'
import { PayloadError } from '#/utils/errors'
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
    if (!device.id && !device.details)
      throw new PayloadError(errorMessages.noDeviceDetails, {
        fields: ['device.id', 'device.details']
      })

    if (!user.password && !user.provider)
      throw new PayloadError(errorMessages.noLoginProviderFound, {
        fields: ['user.password', 'user.provider']
      })
    if (user.password && user.provider)
      throw new PayloadError(errorMessages.cannotLoginWithPasswordAndProvider, {
        fields: ['user.password', 'user.provider']
      })

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

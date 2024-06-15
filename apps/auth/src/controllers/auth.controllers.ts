import { createNewSession, createOrUpdateDevice } from '#/services'
import { errorMessages } from '#/utils/constants'
import { PayloadError } from '#/utils/errors'
import { generateSession, signToken } from '#/utils/helpers'
import { CreateSessionParams } from '#/utils/types'

export async function createSession({ device, user }: CreateSessionParams) {
  if (!device.id && !device.details)
    throw new PayloadError(errorMessages.noDeviceDetails, {
      fields: ['device.id', 'device.details']
    })
  const session = generateSession()
  const { id: deviceId } = await createOrUpdateDevice(device)
  const { userId } = await createNewSession(session, user, { deviceId })
  const userToken = signToken({ id: userId })
  return { sessionId: session.id, deviceId, userId, userToken }
}

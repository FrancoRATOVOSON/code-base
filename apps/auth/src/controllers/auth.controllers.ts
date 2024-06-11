import { createNewSession, createOrUpdateDevice } from '#/services'
import { generateSession, generateToken } from '#/utils/helpers'
import { CreateSessionParams, CreateSessionReturnType } from '#/utils/types'

export async function createSession({
  device,
  user
}: CreateSessionParams): Promise<CreateSessionReturnType> {
  if (!device.id && !device.details) throw new Error('No device detais')
  const session = generateSession()
  const { id: deviceId } = await createOrUpdateDevice(device)
  const { userId } = await createNewSession(session, user, { deviceId })
  const userToken = generateToken({ id: userId })
  return { sessionId: session.id, deviceId, userId, userToken }
}

import { saveSession } from '#/services'
import { generateSession, generateToken } from '#/utils/helpers'
import { CreateSessionParams, CreateSessionReturnType } from '#/utils/types'

export async function createSession({
  device,
  user
}: CreateSessionParams): Promise<CreateSessionReturnType> {
  if (!device.id && !device.details) throw Error('No device detais')
  const session = generateSession()
  const { deviceId, userId } = await saveSession(session, { user, device })
  const userToken = generateToken({ id: userId })
  return { sessionId: session.id, deviceId, userId, userToken }
}

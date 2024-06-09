import prisma from '../database/prisma-client'
import { CreateSessionParams, GeneratedSessionType } from '../utils/types'

export function saveSession(
  { id, expirationDate }: GeneratedSessionType,
  { user, device }: CreateSessionParams
) {
  return prisma.sessions.create({
    data: {
      id,
      expirationDate,
      login: user.login,
      provider: user.provider,
      user: {
        connectOrCreate: {
          where: {
            id: user.id
          },
          create: {
            id: user.id,
            password: user.password
          }
        }
      },
      device: {
        connect: !device.id ? undefined : { id: device.id },
        create: !device.details ? undefined : { ...device.details, userId: user.id }
      }
    },
    select: { deviceId: true, userId: true }
  })
}

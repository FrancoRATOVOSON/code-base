import z from 'zod'

import { prisma } from '#/database'
import { sessionUserSchema } from '#/schema'
import { GeneratedSessionType } from '#/utils/types'

export function createNewSession(
  { id, expirationDate }: GeneratedSessionType,
  user: z.infer<typeof sessionUserSchema>,
  { deviceId }: { deviceId: string }
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
        connect: { id: deviceId }
      }
    },
    select: { deviceId: true, userId: true }
  })
}

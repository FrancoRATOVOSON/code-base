import z from 'zod'

import { prisma } from '#/database'
import { sessionUserSchema } from '#/schema'
import { hashPassword } from '#/utils/helpers'
import { GeneratedSessionType } from '#/utils/types'

export async function createNewSession(
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
              ? await hashPassword(user.password)
              : undefined
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

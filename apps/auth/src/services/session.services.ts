import { PrismaClient } from '@prisma/client'
import z from 'zod'

import { sessionUserSchema } from '#/schema'
import { hashPassword } from '#/utils/helpers'
import { GeneratedSessionType } from '#/utils/types'

export async function createNewSession(
  client: PrismaClient,
  { id, expirationDate }: GeneratedSessionType,
  user: z.infer<typeof sessionUserSchema>,
  { deviceId }: { deviceId: string }
) {
  return client.sessions.create({
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

export function getSessionOwner(client: PrismaClient, id: string) {
  return client.sessions.findUnique({
    where: { id },
    select: { userId: true }
  })
}

export function logoutSession(
  client: PrismaClient,
  sessionId: string,
  userId: string
) {
  return client.sessions.update({
    where: { id: sessionId, userId },
    data: {
      isActive: false
    },
    select: { id: true }
  })
}

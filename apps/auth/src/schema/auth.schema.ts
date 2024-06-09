import { AuthProvider, DeviceClientType, DeviceType } from '@prisma/client'
import { z } from 'zod'

import { semverRegex } from '#/utils/helpers'

const semverSchema = z.string().max(100).regex(semverRegex)
const sessionIdSchema = z.string().base64().min(64)

export const deviceDetailsSchema = z.object({
  os: z.object({
    name: z.string(),
    version: semverSchema.nullable()
  }),
  manufacturer: z.string().nullable(),
  browser: z
    .object({
      name: z.string(),
      version: semverSchema
    })
    .nullable()
})

export const deviceLocationSchema = z.object({
  city: z.string(),
  region: z.string(),
  country: z.string()
})

export const createSessionBodySchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    login: z.string(),
    password: z.string().nullable(),
    provider: z.nativeEnum(AuthProvider)
  }),
  device: z
    .object({
      id: z.string().uuid().nullable(),
      details: z
        .object({
          deviceType: z.nativeEnum(DeviceType),
          client: z.nativeEnum(DeviceClientType),
          appVersion: semverSchema,
          deviceDetails: deviceDetailsSchema,
          location: deviceLocationSchema
        })
        .nullable()
    })
    .refine(
      obj => {
        return !(obj.id === null && obj.details === null)
      },
      { message: 'Device informations missing' }
    )
})

export const createSessionResponseSchema = z.object({
  sessionId: sessionIdSchema,
  deviceId: z.string().uuid(),
  userId: z.string().uuid(),
  userToken: z.string()
})

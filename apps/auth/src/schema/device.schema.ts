import { DeviceClientType, DeviceType } from '@prisma/client'
import z from 'zod'

import { semverSchema } from './utils.schema'

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

export const createSessionDeviceSchema = z
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
    object => {
      return !(object.id === null && object.details === null)
    },
    { message: 'Device informations missing' }
  )

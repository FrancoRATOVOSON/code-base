import { DeviceClientType, DeviceType } from '@prisma/client'
import z from 'zod'

import { errorMessages } from '#/utils/constants'

import { semverSchema } from './utils.schema'

export const deviceDetailsSchema = z.object({
  os: z.object({
    name: z.string(),
    version: semverSchema.nullable().optional()
  }),
  manufacturer: z.string().nullable().optional(),
  browser: z
    .object({
      name: z.string(),
      version: semverSchema
    })
    .nullable()
    .optional()
})

export const deviceLocationSchema = z.object({
  city: z.string(),
  region: z.string(),
  country: z.string()
})

const deviceIdSchema = z.string().uuid().nullable().optional()
const sessionDeviceDetailsSchema = z.object({
  deviceType: z.nativeEnum(DeviceType),
  client: z.nativeEnum(DeviceClientType),
  appVersion: semverSchema,
  deviceDetails: deviceDetailsSchema,
  location: deviceLocationSchema
})

export const createSessionDeviceSchema = z
  .object({
    id: deviceIdSchema.nullable().optional(),
    details: sessionDeviceDetailsSchema.nullable().optional()
  })
  .refine(payload => payload.id || payload.details, {
    message: errorMessages.noDeviceDetails
  })

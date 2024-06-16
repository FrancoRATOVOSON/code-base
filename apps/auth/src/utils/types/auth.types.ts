import { z } from 'zod'

import {
  createSessionBodySchema,
  createSessionDeviceSchema,
  createSessionResponseSchema
} from '#/schema'

export type DeviceDetails = PrismaJson.DeviceDetails
export type DeviceLocation = PrismaJson.DeviceLocation

export type CreateSessionParams = z.infer<typeof createSessionBodySchema>

export type CreateSessionReturnType = z.infer<
  typeof createSessionResponseSchema
>

export type GeneratedSessionType = {
  id: string
  expirationDate: Date
}

export type CreateSessionDeviceType = z.infer<typeof createSessionDeviceSchema>

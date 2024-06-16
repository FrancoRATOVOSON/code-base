import { z } from 'zod'

import { createSessionDeviceSchema } from './device.schema'
import { sessionUserSchema } from './user.schema'
import { sessionIdSchema } from './utils.schema'

export const createSessionBodySchema = z.object({
  user: sessionUserSchema,
  device: createSessionDeviceSchema
})

export const createSessionResponseSchema = z.object({
  sessionId: sessionIdSchema,
  deviceId: z.string().uuid(),
  userId: z.string().uuid(),
  userToken: z.string()
})

export const cookieAuthSchema = z.object({
  sessionId: sessionIdSchema
})

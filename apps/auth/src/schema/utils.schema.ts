import z from 'zod'

import { semverRegex } from '#/utils/helpers'

export const semverSchema = z.string().max(100).regex(semverRegex)
export const sessionIdSchema = z.string().base64().min(64)

export const responseErrorSchema = z.object({
  code: z.number().int().min(400).max(500),
  error: z.string(),
  message: z.string()
})

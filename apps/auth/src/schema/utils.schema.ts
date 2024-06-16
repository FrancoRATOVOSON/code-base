import z from 'zod'

import { semverRegex } from '#/utils/constants'
import { HttpErrorType } from '#/utils/types'

export const semverSchema = z.string().max(100).regex(semverRegex)
export const sessionIdSchema = z.string().base64().min(64)

export const createErrorResponseSchema = (error: HttpErrorType) =>
  z.object({
    code: z.number().int().min(400).max(599).default(error.code),
    error: z.string().default(error.error),
    message: z.string()
  })

export const emptyResponseSchema = z.null()

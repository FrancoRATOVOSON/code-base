import z from 'zod'

import { createErrorResponseSchema } from '#/schema'

import { httpErrors } from '../constants'

export type ResponseErrorType = z.infer<
  ReturnType<typeof createErrorResponseSchema>
>

type HttpErrors = typeof httpErrors
export type HttpErrorType = HttpErrors[keyof HttpErrors]

export type HttpErrorCodes = keyof typeof httpErrors

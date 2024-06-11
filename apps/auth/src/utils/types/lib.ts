import z from 'zod'

import { responseErrorSchema } from '#/schema'

import { httpErrors } from '../helpers'

export type ResponseErrorType = z.infer<typeof responseErrorSchema>

type HttpErrors = typeof httpErrors
export type HttpErrorType = HttpErrors[keyof HttpErrors]

export type HttpErrorCodes = keyof typeof httpErrors

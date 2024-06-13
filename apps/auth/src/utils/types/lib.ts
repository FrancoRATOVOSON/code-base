import z from 'zod'

import { responseErrorSchema } from '#/schema'

import { httpErrors } from '../constants'

export type ResponseErrorType = z.infer<typeof responseErrorSchema>

type HttpErrors = typeof httpErrors
export type HttpErrorType = HttpErrors[keyof HttpErrors]

export type HttpErrorCodes = keyof typeof httpErrors

export type DeepReadonly<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>
}

export interface IPrototype {
  prototype: any
}
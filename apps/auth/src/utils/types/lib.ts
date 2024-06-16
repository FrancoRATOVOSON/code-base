import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteOptions
} from 'fastify'

import z from 'zod'

import { createErrorResponseSchema } from '#/schema'

import { httpErrors } from '../constants'

export type ResponseErrorType = z.infer<
  ReturnType<typeof createErrorResponseSchema>
>

type HttpErrors = typeof httpErrors
export type HttpErrorType = HttpErrors[keyof HttpErrors]

export type HttpErrorCodes = keyof typeof httpErrors

export type RouteType<
  RequestBodyType = null | undefined,
  ResponseBodyType = null | undefined
> = RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  { Body: RequestBodyType; Reply: ResponseBodyType }
>

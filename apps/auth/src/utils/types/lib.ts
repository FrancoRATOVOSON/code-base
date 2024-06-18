import {
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteGenericInterface,
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
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface
> = RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteGeneric
>

export type CreateRouteObjectFunctionType<
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface
> = (fastify: FastifyInstance) => RouteType<RouteGeneric>

export type DoneFunctionType = (error?: Error) => void

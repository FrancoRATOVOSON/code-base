import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteGenericInterface,
  RouteOptions
} from 'fastify'

import z from 'zod'

import { createErrorResponseSchema } from '#/schema'

import { authenticationErrors, httpErrors } from '../constants'

export type ResponseErrorType = z.infer<
  ReturnType<typeof createErrorResponseSchema>
>

type HttpErrors = typeof httpErrors
export type HttpErrorType = HttpErrors[keyof HttpErrors]

export type HttpErrorCodes = keyof typeof httpErrors

type AuthenticationError = typeof authenticationErrors
export type AuthenticationErrorType = keyof AuthenticationError
type AuthenticationSessionError = keyof typeof authenticationErrors.session
type AuthenticationTokenError = keyof typeof authenticationErrors.token
export type AuthenticationErrorCode<
  AuthErrorType extends AuthenticationErrorType
> = AuthErrorType extends 'session'
  ? (typeof authenticationErrors)['session'][AuthenticationSessionError]
  : (typeof authenticationErrors)['token'][AuthenticationTokenError]

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

export type FastifyDecoratorFunctionType = (
  request: FastifyRequest,
  rep: FastifyReply,
  done: DoneFunctionType
) => void

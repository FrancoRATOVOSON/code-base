import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'

import fp from 'fastify-plugin'

import { cookieAuthSchema } from '#/schema'
import { authenticationErrors } from '#/utils/constants'
import { SessionError, TokenError } from '#/utils/errors'
import { verifyToken } from '#/utils/helpers'
import { DoneFunctionType, FastifyDecoratorFunctionType } from '#/utils/types'

declare module 'fastify' {
  interface FastifyInstance {
    verifySession: FastifyDecoratorFunctionType
    verifyToken: FastifyDecoratorFunctionType
  }
}

const authDecorator: FastifyPluginAsync = async fastify => {
  fastify.decorate(
    'verifySession',
    function (
      request: FastifyRequest,
      reply: FastifyReply,
      done: DoneFunctionType
    ) {
      const requestCookies = request.headers.cookie
      if (!requestCookies)
        return done(
          new SessionError(authenticationErrors.session.noCookieHeaderFound)
        )
      const sessionCookies = fastify.parseCookie(requestCookies)
      const parseResult = cookieAuthSchema.safeParse(sessionCookies)
      if (parseResult.error)
        return done(
          new SessionError(authenticationErrors.session.noSessionFieldInCookies)
        )
      return done()
    }
  )

  fastify.decorate(
    'verifyToken',
    function (
      request: FastifyRequest,
      reply: FastifyReply,
      done: DoneFunctionType
    ) {
      const authorization = request.headers.authorization
      if (!authorization)
        return done(
          new SessionError<'token'>(
            authenticationErrors.token.noRequestAuthorizationFound
          )
        )

      const token = authorization.split(' ').at(1)
      if (!token)
        return done(
          new SessionError<'token'>(authenticationErrors.token.noTokenFound)
        )

      try {
        return verifyToken(token)
      } catch (error) {
        if (error instanceof TokenError) return done(error)
        fastify.log.debug(error)
        return done(
          new SessionError<'token'>(
            authenticationErrors.token.wrongAuthorizationFormat
          )
        )
      }
    }
  )
}

export default fp(authDecorator)

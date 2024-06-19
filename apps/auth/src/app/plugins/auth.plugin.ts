import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'

import fastifyAuth from '@fastify/auth'
import fastifyBearerAuth from '@fastify/bearer-auth'

import fp from 'fastify-plugin'

import { env } from '#/configs'
import { cookieAuthSchema } from '#/schema'
import { SessionError } from '#/utils/errors'
import { verifyToken } from '#/utils/helpers'
import { DoneFunctionType } from '#/utils/types'

declare module 'fastify' {
  interface FastifyInstance {
    verifySession: (
      request: FastifyRequest,
      rep: FastifyReply,
      done: DoneFunctionType
    ) => void
  }
}

const authPlugin: FastifyPluginAsync = async fastify => {
  fastify.register(fastifyAuth)

  fastify.register(fastifyBearerAuth, {
    keys: [env.TOKEN_SECRET_KEY],
    addHook: false,
    auth(key, request) {
      const requestAuth = request.headers.authorization
      if (!requestAuth) return false
      const token = requestAuth.split(' ')[1]
      if (!token) return false
      return verifyToken(token)
    }
  })

  fastify.decorate(
    'verifySession',
    function (
      request: FastifyRequest,
      reply: FastifyReply,
      done: DoneFunctionType
    ) {
      const requestCookies = request.headers.cookie
      if (!requestCookies) return done(new SessionError(1))
      const sessionCookies = fastify.parseCookie(requestCookies)
      const parseResult = cookieAuthSchema.safeParse(sessionCookies)
      if (parseResult.error) return done(new SessionError(2))
      return done()
    }
  )
}

export default fp(authPlugin)

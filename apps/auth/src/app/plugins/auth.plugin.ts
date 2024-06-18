import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'

import auth from '@fastify/auth'
import fastifyBearerAuth from '@fastify/bearer-auth'

import { env } from '#/configs'
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
  fastify.decorate(
    'verifySession',
    function (
      request: FastifyRequest,
      reply: FastifyReply,
      done: DoneFunctionType
    ) {
      const requestCookies = request.headers.cookie
      if (!requestCookies) return done(new Error('No session'))
      const sessionCookies = fastify.parseCookie(requestCookies)
      if (!sessionCookies.sessionId) return done(new Error('No session'))
      return done()
    }
  )

  fastify.register(auth)
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
}

export default authPlugin

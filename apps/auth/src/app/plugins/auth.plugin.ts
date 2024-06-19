import { FastifyPluginAsync } from 'fastify'

import fastifyAuth from '@fastify/auth'
// import fastifyBearerAuth from '@fastify/bearer-auth'

import fastifyCookie, { FastifyCookieOptions } from '@fastify/cookie'

import fp from 'fastify-plugin'

import { env } from '#/configs'

// import { env } from '#/configs'
// import { verifyToken } from '#/utils/helpers'

const authPlugin: FastifyPluginAsync = async fastify => {
  fastify.register(fastifyAuth)

  fastify.register(fastifyCookie, {
    secret: env.COOKIE_SECRET_KEY,
    hook: 'onRequest',
    parseOptions: {}
  } as FastifyCookieOptions)

  // fastify.register(fastifyBearerAuth, {
  //   keys: [env.TOKEN_SECRET_KEY],
  //   addHook: false,
  //   auth(key, request) {
  //     const requestAuth = request.headers.authorization
  //     if (!requestAuth) return false
  //     const token = requestAuth.split(' ')[1]
  //     if (!token) return false
  //     return verifyToken(token)
  //   }
  // })
}

export default fp(authPlugin)

import { FastifyPluginAsync } from 'fastify'

import fastifyAuth from '@fastify/auth'
import fastifyBearerAuth from '@fastify/bearer-auth'

import fp from 'fastify-plugin'

import { env } from '#/configs'
import { verifyToken } from '#/utils/helpers'

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
}

export default fp(authPlugin)

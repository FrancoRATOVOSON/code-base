import { FastifyInstance } from 'fastify'

import auth from './auth'

async function router(fastify: FastifyInstance) {
  fastify.register(auth)
}

export default router

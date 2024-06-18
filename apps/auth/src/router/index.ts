import { FastifyInstance } from 'fastify'

import auth from './auth'

async function router(fastify: FastifyInstance) {
  fastify.register(auth, { prefix: 'auth' })
}

// export default fp(router)
export default router

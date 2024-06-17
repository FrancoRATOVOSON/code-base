import { FastifyInstance } from 'fastify'

import auth from './auth'

async function router(
  fastify: FastifyInstance,
  _: unknown,
  done: VoidFunction
) {
  fastify.register(auth, { prefix: 'auth' })

  done()
}

export default router

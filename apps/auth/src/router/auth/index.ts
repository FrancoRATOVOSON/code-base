import { FastifyInstance } from 'fastify'

import { ZodTypeProvider } from 'fastify-type-provider-zod'

import loginRoute from './login.route'
import logoutRoute from './logout.route'

async function auth(fastify: FastifyInstance, _: unknown, done: VoidFunction) {
  fastify.withTypeProvider<ZodTypeProvider>().route(loginRoute)
  fastify.withTypeProvider<ZodTypeProvider>().route(logoutRoute)

  done()
}

export default auth

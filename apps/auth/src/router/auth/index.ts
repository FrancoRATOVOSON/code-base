import { FastifyInstance } from 'fastify'

import { ZodTypeProvider } from 'fastify-type-provider-zod'

import loginRoute from './login.route'
import createLogoutRoute from './logout.route'

async function auth(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().route(loginRoute)
  fastify.withTypeProvider<ZodTypeProvider>().route(createLogoutRoute(fastify))
}

export default auth

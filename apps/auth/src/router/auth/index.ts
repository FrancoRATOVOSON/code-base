import { FastifyInstance } from 'fastify'

import { ZodTypeProvider } from 'fastify-type-provider-zod'

import createLoginRoute from './login.route'
import createLogoutRoute from './logout.route'

async function auth(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().route(createLoginRoute(fastify))
  fastify.withTypeProvider<ZodTypeProvider>().route(createLogoutRoute(fastify))
}

export default auth

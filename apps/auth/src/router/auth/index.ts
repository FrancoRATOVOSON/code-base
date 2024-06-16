import { FastifyInstance } from 'fastify'

import loginRoute from './login.route'
import logoutRoute from './logout.route'

async function auth(fastify: FastifyInstance) {
  fastify.route(loginRoute)
  fastify.route(logoutRoute)
}

export default auth

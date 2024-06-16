import fastify from 'fastify'

import fastifyCookie from '@fastify/cookie'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform
} from 'fastify-type-provider-zod'

import { env, logger } from '.'

function createServer() {
  const server = fastify({
    logger: env.NODE_ENV === 'test' ? false : logger
  })

  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Session API',
        description: 'Authentication & Session managment service',
        version: '0.1.0'
      },
      components: {
        securitySchemes: {
          cookieAuth: {
            type: 'apiKey',
            in: 'cookie',
            name: 'sessionId'
          },
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'jwt'
          }
        }
      }
    },
    transform: jsonSchemaTransform
  })

  server.register(fastifyCookie, {
    secret: env.COOKIE_SECRET_KEY,
    hook: 'preHandler'
  })

  if (env.NODE_ENV === 'development') {
    server.register(fastifySwaggerUi, {
      routePrefix: '/documentation'
    })
  }

  return server
}

export default createServer()

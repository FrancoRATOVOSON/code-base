import fastify from 'fastify'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform
} from 'fastify-type-provider-zod'

import { auth } from './router'
import { logger } from './utils/helpers'
import env from './utils/helpers/env'

const app = fastify({
  logger: env.NODE_ENV === 'test' ? false : logger
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Session API',
      description: 'Authentication & Session managment service',
      version: '0.1.0'
    }
  },
  transform: jsonSchemaTransform
})

if (env.NODE_ENV === 'development') {
  app.register(fastifySwaggerUi, {
    routePrefix: '/documentation'
  })
}

app.register(auth)

export default app

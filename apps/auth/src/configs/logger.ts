import pino from 'pino'
import pretty from 'pino-pretty'

import environment from './env'

const stream = pretty({
  colorize: true,
  translateTime: 'HH:MM:ss Z',
  ignore: 'pid,hostname'
})

const loggerProduction = pino(stream)

const loggerDevelopment = pino({
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname'
    }
  }
})

const logger =
  environment.NODE_ENV === 'production' ? loggerProduction : loggerDevelopment

export default logger

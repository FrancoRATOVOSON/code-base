import pino from 'pino'
import pretty from 'pino-pretty'

import env from './env'

const stream = pretty({
  colorize: true,
  translateTime: 'HH:MM:ss Z',
  ignore: 'pid,hostname'
})

const loggerProd = pino(stream)

const loggerDev = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname'
    }
  }
})

const logger = env.NODE_ENV === 'production' ? loggerProd : loggerDev

export default logger

import { cleanEnv, makeValidator, str } from 'envalid'

const tokentKeyValidator = makeValidator<string>(key => {
  if (typeof key !== 'string') throw new Error('Token key must be a string')
  if (key.length < 64) throw new Error('Token key must be at least 64 characters')
  return key
})

const appPortValidator = makeValidator<number>(value => {
  const port = Number.parseInt(value, 10)
  if (Number.isNaN(port)) throw new Error('Error when getting port from .env')
  return port
})

const env = cleanEnv(
  process.env,
  {
    TOKEN_SECRET_KEY: tokentKeyValidator({ desc: 'token key for jwt' }),
    PORT: appPortValidator(),
    NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' })
  },
  {
    reporter: ({ errors }) => {
      for (const [envVar, error] of Object.entries(errors)) {
        console.error(`Environment variable error - on ${envVar} [${error}]`)
      }
    }
  }
)

export default env

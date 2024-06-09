import app from '#/app'
import env from '#env'

const port = env.PORT

async function startApp() {
  try {
    await app.ready()
    app.swagger()
    await app.listen({ port })
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

startApp()

import app from './app'
import env from './utils/helpers/env'

const port = env.PORT

async function startApp() {
  try {
    await app.ready()
    app.swagger()
    const addr = await app.listen({ port })

    console.log(`App listening in address: ${addr}`)
  } catch (error) {
    console.error('App error')
    console.error(error)
    process.exit(1)
  }
}

startApp()

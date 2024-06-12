import { server, env } from '#/configs'
import { auth } from '#/router'

function createApp() {
  server.register(auth)

  return server
}

async function startApp() {
  const port = env.PORT
  const app = createApp()

  try {
    await app.ready()
    app.swagger()
    await app.listen({ port })
  } catch (error) {
    app.log.error(error)
    throw error
  }
}

export default startApp

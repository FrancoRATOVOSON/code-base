import { server, env } from '#/configs'
import router from '#/router'
import { getResponseFromError } from '#/utils/helpers'

import { authPlugin } from './plugins'

async function createApp() {
  server.setErrorHandler(function (error, _request, rep) {
    const responseError = getResponseFromError(server.log, error)
    rep.status(responseError.code).send(responseError)
  })

  server.register(authPlugin).after(() => server.register(router))
  // server.register(router)

  return server
}

export async function startApp() {
  const port = env.PORT
  const app = await createApp()

  try {
    await app.ready()
    app.swagger()
    await app.listen({ port })
  } catch (error) {
    app.log.error(error)

    throw error
  }
}

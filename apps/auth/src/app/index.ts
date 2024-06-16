import { server, env } from '#/configs'
import router from '#/router'
import { getResponseFromError } from '#/utils/helpers'

function createApp() {
  server.setErrorHandler(function (error, _request, rep) {
    const responseError = getResponseFromError(server.log, error)
    return rep.status(responseError.code).send(responseError)
  })

  server.register(router)

  return server
}

export async function startApp() {
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

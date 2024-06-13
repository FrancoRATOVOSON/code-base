/* eslint-disable functional/no-expression-statements */
/* eslint-disable functional/functional-parameters */
import { server, env } from '#/configs'
import { auth } from '#/router'
import { httpErrors } from '#/utils/constants'
import { createResponseError } from '#/utils/helpers'

function createApp() {
  server.setErrorHandler(function (error, request, rep) {
    const errorMessage = error.message
    const responseError = createResponseError(httpErrors.badRequest, errorMessage)
    return rep.status(responseError.code).send(responseError)
  })

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
    // eslint-disable-next-line functional/no-throw-statements
    throw error
  }
}

export default startApp

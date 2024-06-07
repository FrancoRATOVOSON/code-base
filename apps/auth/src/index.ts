import fastify from 'fastify'

const server = fastify()

server.get('/ping', async () => {
  return 'pong\n'
})

server.get('/hello', async () => {
  return 'Hello, World!\n'
})

server.listen({ port: 8080 }, (err, addr) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${addr}`)
})

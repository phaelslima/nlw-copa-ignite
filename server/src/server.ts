import Fastify from 'fastify'

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()

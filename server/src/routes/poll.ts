import { FastifyInstance } from 'fastify'
import ShortUniqueId from 'short-unique-id'
import { z } from 'zod'

import { prisma } from '../lib/prisma'
import { authenticate } from '../plugins/authenticate'

export async function pollRoutes(fastify: FastifyInstance) {
  fastify.get('/polls/count', async () => {
    const count = await prisma.poll.count()

    return { count }
  })

  fastify.post('/polls', async (request, reply) => {
    const createPollBody = z.object({
      title: z.string(),
    })

    const { title } = createPollBody.parse(request.body)

    const uniqueIdGenerate = new ShortUniqueId({ length: 6 })

    const code = String(uniqueIdGenerate()).toUpperCase()

    try {
      await request.jwtVerify()

      await prisma.poll.create({
        data: {
          title,
          code,
          ownerId: request.user.sub,

          participants: {
            create: {
              userId: request.user.sub,
            },
          },
        },
      })
    } catch (error) {
      await prisma.poll.create({
        data: {
          title,
          code,
        },
      })
    }

    return reply.status(201).send({ code })
  })

  fastify.post(
    '/polls/join',
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const joinPollBody = z.object({
        code: z.string(),
      })

      const { code } = joinPollBody.parse(request.body)

      const poll = await prisma.poll.findUnique({
        where: {
          code,
        },
        include: {
          participants: {
            where: {
              userId: request.user.sub,
            },
          },
        },
      })

      if (!poll) {
        return await reply.status(404).send({ message: 'Poll not found.' })
      }

      if (poll.participants.length > 0) {
        return await reply.status(409).send({ message: 'Already joined.' })
      }

      if (!poll.ownerId) {
        await prisma.poll.update({
          where: {
            id: poll.id,
          },
          data: {
            ownerId: request.user.sub,
          },
        })
      }

      await prisma.participant.create({
        data: {
          pollId: poll.id,
          userId: request.user.sub,
        },
      })

      return await reply.status(201).send()
    }
  )

  fastify.get(
    '/polls',
    {
      onRequest: [authenticate],
    },
    async (request) => {
      const polls = await prisma.poll.findMany({
        where: {
          participants: {
            some: {
              userId: request.user.sub,
            },
          },
        },
        include: {
          _count: {
            select: {
              participants: true,
            },
          },

          participants: {
            select: {
              id: true,

              user: {
                select: {
                  avatarURL: true,
                },
              },
            },
            take: 4,
          },

          owner: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })

      return { polls }
    }
  )

  fastify.get(
    '/polls/:id',
    {
      onRequest: [authenticate],
    },
    async (request) => {
      const getPollParamas = z.object({
        id: z.string(),
      })

      const { id } = getPollParamas.parse(request.params)

      const poll = await prisma.poll.findUnique({
        where: {
          id,
        },
        include: {
          _count: {
            select: {
              participants: true,
            },
          },

          participants: {
            select: {
              id: true,

              user: {
                select: {
                  avatarURL: true,
                },
              },
            },
            take: 4,
          },

          owner: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })

      return { poll }
    }
  )
}

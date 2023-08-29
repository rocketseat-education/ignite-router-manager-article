import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient()

export async function profileController(app: FastifyInstance) {
  app.get('/me', { onRequest: verifyJWT }, async (request, reply) =>{
    const userId= request.user.sub

    const user = await prismaClient.user.findFirst({
      where: {
        id: userId
      }
    })

    if(!user) {
      return reply.status(401).send({
        error: 'Token de acesso inválido',
        status: 'token.invalid'
      })
    }

    return {
      me: {
        ...user,
        avatar_url: `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}`,
        password: undefined
      }
    }
  })
}
import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import bcrypt from 'bcryptjs'
import { verifyJWT } from "../middlewares/verify-jwt";

const prismaClient = new PrismaClient()


type SessionBody = {
  email: string;
  password: string
}

export async function sessionController(app: FastifyInstance) {
  app.post('/sessions', async (request, reply) => {

    const { email, password } = request.body as SessionBody

    try {
      const user = await prismaClient.user.findFirst({
        where: {
          email,
        },
      })

      if (!user) {
        return reply.status(401).send({
          error: 'Credenciais inválidas',
        })
      }

      const passwordIsValid = await bcrypt.compare(password, user.password)

      if (!passwordIsValid) {
        return reply.status(401).send({
          error: 'Credenciais inválidas',
        })
      }

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id,
          },
        },
      )

      const refreshToken = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id,
            expiresIn: '2d',
          },
        },
      )

      return reply
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
          sameSite: true,
          httpOnly: true,
        })
        .status(200)
        .send({
          token,
        })
    } catch (error) {
      return reply.status(401).send({
        error: 'Falha na autenticação',
      })
    }
  })

  app.get('/me', { onRequest: verifyJWT }, async (request) =>{
    const userId= request.user.sub

    const user = await prismaClient.user.findFirst({
      where: {
        id: userId
      }
    })

    return {
      me: {
        ...user,
        password: undefined
      }
    }
  })
}
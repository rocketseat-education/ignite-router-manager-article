import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import bcrypt from 'bcryptjs'

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

  app.patch('/refresh-token', async (request, reply) => {
    try {
      await request.jwtVerify({ onlyCookie: true })

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: request.user.sub,
          },
        },
      )

      const refreshToken = await reply.jwtSign(
        {},
        {
          sign: {
            sub: request.user.sub,
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
        error: 'Erro ao revalidar o token',
        status: 'token.invalid'
      })
    }
  })
}
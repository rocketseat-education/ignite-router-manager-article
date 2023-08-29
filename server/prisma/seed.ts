import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'

const prismaClient = new PrismaClient()

async function run() {
  const userId = '55c25db9-8125-4d8c-a521-a9f52ba215c7'
  const passwordHash = await bcrypt.hash('123456', 8)

  const findUser =  await prismaClient.user.findFirst({
    where: {
      id: userId
    }
  })

  if(findUser) {
    await prismaClient.user.delete({
      where: {
        id: userId
      }
    })
  }

  await prismaClient.user.create({
    data: {
      id: userId,
      name: 'Usuário Teste',
      email: 'root@email.com',
      role: 'Dev Instructor as Rocketseat',
      bio: 'Cevadis im ampola pa arma uma pindureta. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl. Quem manda na minha terra sou euzis!',
      password: passwordHash,
    }
  })
}

run()
  .then(async () => {
    await prismaClient.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await prismaClient.$disconnect()
    process.exit(1)
  })
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { sessionController } from "./controllers/session-controller";
import { profileController } from "./controllers/profile-controller";

const app = fastify()

app.register(fastifyJwt, {
  secret: String(process.env.JWT_SECRET),
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '30s',
  },
})

app.register(fastifyCookie)

app.register(sessionController)
app.register(profileController)

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server runing')
  })
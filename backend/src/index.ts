import { Hono } from 'hono'
import { mainRouter } from './routes/indexRouter'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/api/v1",mainRouter)



export default app

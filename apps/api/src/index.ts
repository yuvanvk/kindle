import { clerkMiddleware, getAuth } from '@clerk/hono';
import { Hono } from 'hono'
import { cors } from 'hono/cors';


const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000", "https://onechat.yuvan.me"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposeHeaders: ["Set-Cookie"],
    credentials: true,
  }),
);

const api = app.basePath("/api/v1");
const protectedRoutes = new Hono();

/*
 * protectedRoutes can only be accessed
 * if user is authenticated
**/
app.use("*", clerkMiddleware());



api.route("/", protectedRoutes);

app.get('/', (c) => {
  const auth = getAuth(c)

  if (!auth?.userId) {
    return c.json({
      message: 'You are not logged in.',
    })
  }

  console.log(auth.userId);
  

  return c.json({
    message: 'You are logged in!',
    userId: auth.userId,
  })
});

export default app

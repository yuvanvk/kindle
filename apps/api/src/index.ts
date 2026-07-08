import { Hono } from 'hono'
import { cors } from 'hono/cors';
import callbacks from "./routes/callbacks";
import user from "./routes/user";
import { clerkMiddleware } from '@clerk/hono';
import { convexMiddleware } from "./middleware";

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
api.use("*", convexMiddleware);
const protectedRoutes = new Hono();


/*
 * protectedRoutes can only be accessed
 * if user is authenticated
**/
protectedRoutes.use("*", clerkMiddleware());
protectedRoutes.route("/user", user);

api.route("/", callbacks);
api.route("/", protectedRoutes);

app.get("/", (c) => {
  return c.json({ message: "Iam Healthy!" });
});


export default app

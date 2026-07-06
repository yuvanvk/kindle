import { createMiddleware } from "hono/factory";
import { Bindings, Variables } from "./types";
import { ConvexHttpClient } from "@workspace/convex";

export const convexMiddleware = createMiddleware<{Bindings: Bindings, Variables: Variables }>(async (c, next) => {
    const convex = new ConvexHttpClient(c.env.CONVEX_URL);
    c.set("convex", convex);
    await next();
});
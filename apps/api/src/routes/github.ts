import { getAuth } from "@clerk/hono";
import { Hono } from "hono";
import { api, ConvexHttpClient } from "@workspace/convex";

const router = new Hono();

router.get("/callback", async (c) => {

    const { installation_id, state } = c.req.query();
    if (!installation_id || !state) {
        return c.redirect("/dashboard?error=missing_params");
    }
});

export default router;



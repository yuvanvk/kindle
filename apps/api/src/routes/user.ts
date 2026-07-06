import { Hono } from "hono";
import { Bindings, Variables } from "../types";
import { getAuth } from "@clerk/hono";
import { SignJWT } from "jose";
import { JOSEError } from "jose/errors";

const router = new Hono<{ Bindings: Bindings, Variables: Variables }>();

router.get("/connect-github", async (c) => {
    try {
        const auth = getAuth(c);
        const clerkUserId = auth.userId;
        const secret = new TextEncoder().encode(c.env.STATE_SIGNING_SECRET);

        const state = await new SignJWT({ clerkUserId })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("10m")
            .sign(secret)

        return c.json({ message: "OK", url: `https://github.com/apps/connect-kindle/installations/new?state=${encodeURIComponent(state)}`});

    } catch (error) {
        if(error instanceof JOSEError) {
            console.log("CONNECT_GITHUB", error);
            return c.json({ message: "Invalid Signature"}, 500);
        }
        return c.json({ message: "Internal Server Error" }, 500)
    }
});


export default router;
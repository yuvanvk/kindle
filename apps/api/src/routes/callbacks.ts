import { Hono } from "hono";
import { jwtVerify } from "jose";
import { api } from "@workspace/convex";
import { Bindings, Variables } from "../types";
import { JOSEError } from "jose/errors";
import { App } from "octokit";
import { normalizePrivateKey } from "../lib/github-private-key";


const router = new Hono<{ Bindings: Bindings, Variables: Variables }>({ strict: false });


router.get("/github/callback", async (c) => {
    try {
        
        const { state, installation_id } = c.req.query();
        const convex = c.get("convex");

        if(!installation_id || !state) {
            return c.redirect(`${c.env.FRONTEND_URL}/dashboard?error=missing_params`)
        }
        const secret = new TextEncoder().encode(c.env.STATE_SIGNING_SECRET)        
        const { payload } = await jwtVerify(state, secret);
        const clerkUserId = payload.clerkUserId as string;

        const app = new App({
            appId: c.env.GITHUB_APP_ID,
            privateKey: normalizePrivateKey(c.env.GITHUB_APP_PRIVATE_KEY),
        });

        const { data: installation } = await app.octokit.request(
            "GET /app/installations/{installation_id}",
            { installation_id: Number(installation_id) }
        );


        const account = installation.account;
        if (!account) {
            return c.redirect(`${c.env.FRONTEND_URL}/dashboard?error=missing_account`);
        }

        const accountLogin = "login" in account ? account.login : account.slug;
        const accountType = "login" in account ? account.type : "Organization";

        await convex.mutation(api.githubInstallations.saveGithubInstallation, {
            clerkUserId,
            status: "active",
            installationId: installation_id,
            accountLogin,
            accountType,
            createdAt: Date.now(),
        });

        return c.redirect(`${c.env.FRONTEND_URL}/dashboard?success=connected_github`)
    } catch (error) {

        if (error instanceof JOSEError) {
            console.log(error);
            return c.redirect(`${c.env.FRONTEND_URL}/dashboard?error=invalid_signature`)
        }
        if (error instanceof Error) {
            console.log("GITHUB_CALLBACK", error);
            return c.redirect(`${c.env.FRONTEND_URL}/dashboard?error=internal_error`)
        }
        return c.redirect(`${c.env.FRONTEND_URL}/dashboard?error=unknown`);
    }
});

export default router;



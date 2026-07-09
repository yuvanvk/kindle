import { Hono } from "hono";
import { Bindings, Variables } from "../types";
import { Webhooks } from "@octokit/webhooks";
import { api } from "@workspace/convex";

const router = new Hono<{ Bindings: Bindings, Variables: Variables }>();

router.post("/github", async (c) => {
    try {
        const webhook = new Webhooks({
            secret: c.env.GITHUB_WEBHOOK_SECRET
        });

        const convex = c.get("convex");

        // verify the signature using secret
        const signature = c.req.raw.headers.get("x-hub-signature-256");
        const body = await c.req.text();

        if(!(await webhook.verify(body, signature!))) {
            return c.json({ message: "Unauthorized"}, 401);
        }

        const payload = await c.req.json();
        const event = c.req.header("X-GitHub-Event");

         if (event === "installation") {
            const { action, installation } = payload

            await convex.mutation(api.githubInstallations.updateGithubInstallation, {
                installationId: String(parseInt(installation.id)),
                status: action === "created" ? "active" : action
            })
            return c.json({ message: "Updated installation status" }, 200)
         }

         return c.json({ message: "OK" })

    } catch (error) {
        console.log("ERROR_GITHUB_WEBHOOK -> ", error);
        return c.json({ message: "Something went wrong"}, 500)
    }
})

export default router;
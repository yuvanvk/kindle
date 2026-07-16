import { Hono } from "hono"
import { Bindings, Variables } from "../types"
import { getAuth } from "@clerk/hono"
import { SignJWT } from "jose"
import { JOSEError } from "jose/errors"
import { api } from "@workspace/convex"
import { App } from "octokit"

const router = new Hono<{ Bindings: Bindings; Variables: Variables }>()

router.get("/connect-github", async (c) => {
  try {
    const auth = getAuth(c)
    const clerkUserId = auth.userId
    const secret = new TextEncoder().encode(c.env.STATE_SIGNING_SECRET)

    const state = await new SignJWT({ clerkUserId })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("10m")
      .sign(secret)

    return c.json({
      message: "OK",
      url: `https://github.com/apps/connect-kindle/installations/new?state=${encodeURIComponent(state)}`,
    })
  } catch (error) {
    if (error instanceof JOSEError) {
      console.log("CONNECT_GITHUB", error)
      return c.json({ message: "Invalid Signature" }, 500)
    }
    return c.json({ message: "Internal Server Error" }, 500)
  }
})

// maybe cache it because it doesnot change often
router.get("/get-repos", async (c) => {
  try {
    const user = getAuth(c)
    const convex = c.get("convex")
    const clerkUserId = user.userId

    const installation = await convex.query(
      api.githubInstallations.isGithubConnected,
      {
        clerkUserId,
      }
    )

    if (!installation) {
      return c.json({ message: "Connect Github to import repos" }, 404)
    }

    const app = new App({
      appId: c.env.GITHUB_APP_ID,
      privateKey: c.env.GITHUB_APP_PRIVATE_KEY,
    })
    const installationOctokit = await app.getInstallationOctokit(
      installation.installationId
    )
    const { data: repos } = await installationOctokit.request(
      "GET /installation/repositories",
    )

    if (repos.total_count === 0) {
      return c.json({ message: "No repos found", data: { repos: [] } }, 404)
    }

    return c.json({
      message: "Successfully retrived repos",
      data: {
        repos: repos.repositories.map((repo) => ({
          id: repo.id,
          fullName: repo.full_name,
          cloneUrl: repo.clone_url,
          private: repo.private,
          isFork: repo.fork,
          defaultBranch: repo.default_branch,

        })),
      },
    })
  } catch (error) {
    console.log("GET_REPOS", error)
    return c.json({ message: "Something went wrong" }, 500)
  }
})

export default router

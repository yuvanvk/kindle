import { SignJWT } from "jose"

const SECRET = new TextEncoder().encode(process.env.STATE_SIGNING_SECRET)
export function buildGitHubAppInstallURl({
  clerkUserID,
}: {
  clerkUserID: string
}) {
  if (!clerkUserID) return
  console.log("inside build ->",clerkUserID, SECRET);
  

  const state = new SignJWT({ clerkUserID })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("10m")
    .sign(SECRET)

  return `https://github.com/apps/connect-kindle/installations/new?state=${state}`
}

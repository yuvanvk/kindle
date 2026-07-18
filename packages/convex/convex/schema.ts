import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  githubInstallations: defineTable({
    clerkUserId: v.string(),
    installationId: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("suspended"),
      v.literal("deleted")
    ),
    accountLogin: v.string(),
    accountType: v.string(),
    createdAt: v.number(),
  })
    .index("by_installation_id", ["installationId"])
    .index("by_clerk_user_id", ["clerkUserId"]),

  projects: defineTable({
    clerkUserId: v.string(),
    projectId: v.number(),
    projectName: v.string(),
    cloneUrl: v.string(),
    isFork: v.boolean(),
    lockedEnv: v.string(),
    envIv: v.string(),
    lockedDataKey: v.string(),
    keyIv: v.string(),
    updatedAt: v.number(),
  }).index("by_project_id", ["projectId"]),

  tasks: defineTable({
    projectId: v.string(),
  }),
})

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

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
        createdAt: v.number()
    })
    .index("by_installation_id", ["installationId"])
    .index("by_clerk_user_id", ["clerkUserId"]),
})
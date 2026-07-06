import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const upsert = mutation({
  args: {
    clerkUserId: v.string(),
    installationId: v.string(),
    accountLogin: v.string(),
    accountType: v.string(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("githubInstallations")
      .withIndex("by_installation_id", (q) =>
        q.eq("installationId", args.installationId)
      )
      .unique()

    if (existing) {
      await ctx.db.patch(existing._id, {
        clerkUserId: args.clerkUserId,
        accountLogin: args.accountLogin,
        accountType: args.accountType,
      })
      return existing._id
    }

    return await ctx.db.insert("githubInstallations", args)
  },
})

export const queryISGithubConnected = query({
  args: {
    clerkUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("githubInstallations")
      .withIndex("by_clerk_user_id", (q) =>
        q.eq("clerkUserId", args.clerkUserId)
      )
      .unique()

    return existing ? true : false
  },
})

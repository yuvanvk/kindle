import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const saveGithubInstallation = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("githubInstallations", args)
  },
});

export const updateGithubInstallation = mutation({
  args: {
    status: v.union(
      v.literal("active"),
      v.literal("suspended"),
      v.literal("deleted")
    ),
    installationId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("githubInstallations")
      .withIndex("by_installation_id", (q) => q.eq("installationId", args.installationId))
      .unique()

    // Ideally return in a better way here
    if (!existing) {
      return
    }

    switch (args.status) {
      case "deleted":
        return await ctx.db.patch("githubInstallations", existing._id, {
            status: "deleted"
        });
      case "suspended":
        return await ctx.db.patch("githubInstallations", existing._id, {
          status: "suspended"
        })
    }
    
  },
});

export const isGithubConnected = query({
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
});


// GithubInstall 
//  - save user github details (install specific)
//  - delete user github details (install specific)



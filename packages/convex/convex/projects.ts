import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createProject = mutation({
    args: {
        clerkUserId: v.string(),
        projectId: v.number(),
        projectName: v.string(),
        cloneUrl: v.string(),
        isFork: v.boolean(),
        lockedEnv: v.string(),
        envIv: v.string(),
        lockedDataKey: v.string(),
        keyIv: v.string(),
        updatedAt: v.number()
    },
    handler: async (ctx, args) => {
        
    }
})
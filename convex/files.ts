import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

// Create a new task with the given text
export const createFile = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not signed in");
    await ctx.db.insert("files", {
      name: args.name,
    });
  },
});

export const getFiles = query({
  args: {},
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }
    return ctx.db.query("files").collect();
  },
});

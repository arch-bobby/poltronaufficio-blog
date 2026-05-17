import { authRouter } from "./auth-router";
import { articleRouter } from "./article-router";
import { socialRouter } from "./social-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  article: articleRouter,
  social: socialRouter,
});

export type AppRouter = typeof appRouter;

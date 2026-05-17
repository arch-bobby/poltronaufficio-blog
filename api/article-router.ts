import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { blogArticles as articles } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const articleRouter = createRouter({
  /* List all published articles (public) */
  list: publicQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(articles)
      .where(eq(articles.published, true))
      .orderBy(desc(articles.createdAt));
  }),

  /* List all articles (admin only) */
  listAll: adminQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(articles)
      .orderBy(desc(articles.createdAt));
  }),

  /* Get single article by slug (public) */
  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select()
        .from(articles)
        .where(eq(articles.slug, input.slug))
        .limit(1);
      return results[0] || null;
    }),

  /* Create article (admin only) */
  create: adminQuery
    .input(
      z.object({
        slug: z.string().min(1).max(255),
        title: z.string().min(1).max(255),
        category: z.string().min(1).max(100),
        excerpt: z.string().optional(),
        coverImage: z.string().optional(),
        content: z.string().min(1),
        readTime: z.string().optional(),
        published: z.boolean().default(false),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(articles).values(input);
      return { id: Number(result[0].insertId), success: true };
    }),

  /* Update article (admin only) */
  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        slug: z.string().min(1).max(255).optional(),
        title: z.string().min(1).max(255).optional(),
        category: z.string().min(1).max(100).optional(),
        excerpt: z.string().optional(),
        coverImage: z.string().optional(),
        content: z.string().optional(),
        readTime: z.string().optional(),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(articles).set(data).where(eq(articles.id, id));
      return { success: true };
    }),

  /* Delete article (admin only) */
  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(articles).where(eq(articles.id, input.id));
      return { success: true };
    }),

  /* Toggle publish status (admin only) */
  togglePublish: adminQuery
    .input(z.object({ id: z.number(), published: z.boolean() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(articles)
        .set({ published: input.published })
        .where(eq(articles.id, input.id));
      return { success: true };
    }),
});

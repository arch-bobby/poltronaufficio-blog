import { z } from "zod";
import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { socialPosts, blogArticles as articles } from "@db/schema";
import { eq } from "drizzle-orm";

/* ------------------------------------------------------------------ */
/*  Social Media API Integrations                                      */
/* ------------------------------------------------------------------ */

async function postToFacebook(
  pageAccessToken: string,
  pageId: string,
  message: string,
  link?: string
): Promise<{ id: string }> {
  const url = `https://graph.facebook.com/v18.0/${pageId}/feed`;
  const params = new URLSearchParams({
    message,
    access_token: pageAccessToken,
    ...(link ? { link } : {}),
  });
  const res = await fetch(url, { method: "POST", body: params });
  const data = await res.json() as { id?: string; error?: { message: string } };
  if (data.error) throw new Error(data.error.message);
  return { id: data.id || "" };
}

async function postToInstagram(
  accessToken: string,
  igBusinessId: string,
  imageUrl: string,
  caption: string
): Promise<{ id: string }> {
  // Step 1: Create media container
  const createUrl = `https://graph.facebook.com/v18.0/${igBusinessId}/media`;
  const createParams = new URLSearchParams({
    image_url: imageUrl,
    caption,
    access_token: accessToken,
  });
  const createRes = await fetch(createUrl, { method: "POST", body: createParams });
  const createData = await createRes.json() as { id?: string; error?: { message: string } };
  if (createData.error) throw new Error(createData.error.message);

  // Step 2: Publish container
  const publishUrl = `https://graph.facebook.com/v18.0/${igBusinessId}/media_publish`;
  const publishParams = new URLSearchParams({
    creation_id: createData.id || "",
    access_token: accessToken,
  });
  const publishRes = await fetch(publishUrl, { method: "POST", body: publishParams });
  const publishData = await publishRes.json() as { id?: string; error?: { message: string } };
  if (publishData.error) throw new Error(publishData.error.message);
  return { id: publishData.id || "" };
}

async function postToLinkedIn(
  accessToken: string,
  personUrn: string,
  text: string,
  link?: string
): Promise<{ id: string }> {
  const url = "https://api.linkedin.com/v2/ugcPosts";
  const body: Record<string, unknown> = {
    author: personUrn,
    lifecycleState: "PUBLISHED",
    visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text },
        shareMediaCategory: link ? "ARTICLE" : "NONE",
        ...(link
          ? {
              media: [
                {
                  status: "READY",
                  originalUrl: link,
                  title: { text: "Leggi l'articolo" },
                },
              ],
            }
          : {}),
      },
    },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json() as { id?: string; message?: string };
  if (data.id) return { id: data.id };
  if (data.message) throw new Error(data.message);
  throw new Error("LinkedIn post failed");
}

/* ------------------------------------------------------------------ */
/*  Social Router                                                      */
/* ------------------------------------------------------------------ */

export const socialRouter = createRouter({
  /* Get social posts for an article */
  listByArticle: adminQuery
    .input(z.object({ articleId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(socialPosts)
        .where(eq(socialPosts.articleId, input.articleId))
        .orderBy(socialPosts.createdAt);
    }),

  /* Publish to Facebook */
  publishFacebook: adminQuery
    .input(
      z.object({
        articleId: z.number(),
        pageAccessToken: z.string(),
        pageId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const articleRows = await db
        .select()
        .from(articles)
        .where(eq(articles.id, input.articleId))
        .limit(1);
      const article = articleRows[0];
      if (!article) throw new Error("Article not found");

      const message = `${article.title}\n\n${article.excerpt || ""}\n\nLeggi tutto: https://poltronaufficio.it/#/articolo/${article.slug}`;
      const link = `https://poltronaufficio.it/#/articolo/${article.slug}`;

      try {
        const result = await postToFacebook(input.pageAccessToken, input.pageId, message, link);
        await db.insert(socialPosts).values({
          articleId: input.articleId,
          platform: "facebook",
          status: "posted",
          externalId: result.id,
          postedAt: new Date(),
        });
        return { success: true, postId: result.id };
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        await db.insert(socialPosts).values({
          articleId: input.articleId,
          platform: "facebook",
          status: "failed",
          errorMessage,
        });
        throw new Error(errorMessage);
      }
    }),

  /* Publish to Instagram */
  publishInstagram: adminQuery
    .input(
      z.object({
        articleId: z.number(),
        accessToken: z.string(),
        igBusinessId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const articleRows = await db
        .select()
        .from(articles)
        .where(eq(articles.id, input.articleId))
        .limit(1);
      const article = articleRows[0];
      if (!article) throw new Error("Article not found");

      const imageUrl = article.coverImage || "https://poltronaufficio.it/logo.jpg";
      const caption = `${article.title}\n\n${article.excerpt || ""}\n\nLink in bio per leggere tutto l'articolo! 👆`;

      try {
        const result = await postToInstagram(input.accessToken, input.igBusinessId, imageUrl, caption);
        await db.insert(socialPosts).values({
          articleId: input.articleId,
          platform: "instagram",
          status: "posted",
          externalId: result.id,
          postedAt: new Date(),
        });
        return { success: true, postId: result.id };
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        await db.insert(socialPosts).values({
          articleId: input.articleId,
          platform: "instagram",
          status: "failed",
          errorMessage,
        });
        throw new Error(errorMessage);
      }
    }),

  /* Publish to LinkedIn */
  publishLinkedIn: adminQuery
    .input(
      z.object({
        articleId: z.number(),
        accessToken: z.string(),
        personUrn: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const articleRows = await db
        .select()
        .from(articles)
        .where(eq(articles.id, input.articleId))
        .limit(1);
      const article = articleRows[0];
      if (!article) throw new Error("Article not found");

      const text = `${article.title}\n\n${article.excerpt || ""}`;
      const link = `https://poltronaufficio.it/#/articolo/${article.slug}`;

      try {
        const result = await postToLinkedIn(input.accessToken, input.personUrn, text, link);
        await db.insert(socialPosts).values({
          articleId: input.articleId,
          platform: "linkedin",
          status: "posted",
          externalId: result.id,
          postedAt: new Date(),
        });
        return { success: true, postId: result.id };
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        await db.insert(socialPosts).values({
          articleId: input.articleId,
          platform: "linkedin",
          status: "failed",
          errorMessage,
        });
        throw new Error(errorMessage);
      }
    }),

  /* Publish to all platforms at once */
  publishAll: adminQuery
    .input(
      z.object({
        articleId: z.number(),
        facebook: z.object({ pageAccessToken: z.string(), pageId: z.string() }).optional(),
        instagram: z.object({ accessToken: z.string(), igBusinessId: z.string() }).optional(),
        linkedin: z.object({ accessToken: z.string(), personUrn: z.string() }).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const results: Record<string, { success: boolean; postId?: string; error?: string }> = {};

      if (input.facebook) {
        try {
          const r = await postToFacebook(
            input.facebook.pageAccessToken,
            input.facebook.pageId,
            "",
            ""
          );
          results.facebook = { success: true, postId: r.id };
        } catch (err: unknown) {
          results.facebook = { success: false, error: err instanceof Error ? err.message : "Failed" };
        }
      }

      if (input.instagram) {
        try {
          const r = await postToInstagram(
            input.instagram.accessToken,
            input.instagram.igBusinessId,
            "",
            ""
          );
          results.instagram = { success: true, postId: r.id };
        } catch (err: unknown) {
          results.instagram = { success: false, error: err instanceof Error ? err.message : "Failed" };
        }
      }

      if (input.linkedin) {
        try {
          const r = await postToLinkedIn(
            input.linkedin.accessToken,
            input.linkedin.personUrn,
            "",
            ""
          );
          results.linkedin = { success: true, postId: r.id };
        } catch (err: unknown) {
          results.linkedin = { success: false, error: err instanceof Error ? err.message : "Failed" };
        }
      }

      return results;
    }),
});

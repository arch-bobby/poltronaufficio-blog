import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  bigint,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/* ------------------------------------------------------------------ */
/*  Blog Articles                                                      */
/* ------------------------------------------------------------------ */

export const blogArticles = mysqlTable("blog_articles", {
  id: serial("id"),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  excerpt: text("excerpt"),
  coverImage: varchar("coverImage", { length: 500 }),
  content: text("content").notNull(),
  readTime: varchar("readTime", { length: 20 }),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Article = typeof blogArticles.$inferSelect;
export type InsertArticle = typeof blogArticles.$inferInsert;

/* ------------------------------------------------------------------ */
/*  Social Posts (auto-post tracking)                                  */
/* ------------------------------------------------------------------ */

export const socialPosts = mysqlTable("social_posts", {
  id: serial("id").primaryKey(),
  articleId: bigint("articleId", { mode: "number", unsigned: true }).notNull().references(() => blogArticles.id),
  platform: mysqlEnum("platform", ["facebook", "instagram", "linkedin"]).notNull(),
  status: mysqlEnum("status", ["pending", "posted", "failed"]).default("pending").notNull(),
  externalId: varchar("externalId", { length: 255 }),
  errorMessage: text("errorMessage"),
  postedAt: timestamp("postedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SocialPost = typeof socialPosts.$inferSelect;
export type InsertSocialPost = typeof socialPosts.$inferInsert;

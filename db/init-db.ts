import { getDb } from "../api/queries/connection";
import { sql } from "drizzle-orm";

async function initDb() {
  const db = getDb();

  // Create blog_articles table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS blog_articles (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      excerpt TEXT,
      coverImage VARCHAR(500),
      content TEXT NOT NULL,
      readTime VARCHAR(20),
      published BOOLEAN NOT NULL DEFAULT FALSE,
      createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
      updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
    )
  `);

  // Create social_posts table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS social_posts (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      articleId BIGINT UNSIGNED NOT NULL,
      platform ENUM('facebook', 'instagram', 'linkedin') NOT NULL,
      status ENUM('pending', 'posted', 'failed') NOT NULL DEFAULT 'pending',
      externalId VARCHAR(255),
      errorMessage TEXT,
      postedAt TIMESTAMP,
      createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
      FOREIGN KEY (articleId) REFERENCES blog_articles(id)
    )
  `);

  // Insert sample articles
  const existing = await db.execute(sql`SELECT COUNT(*) as count FROM blog_articles`);
  const row = (existing[0] as unknown as { count: number | string }[])[0];
  if (Number(row?.count || 0) === 0) {
    await db.execute(sql`
      INSERT INTO blog_articles (slug, title, category, excerpt, coverImage, content, readTime, published) VALUES
      ('come-scegliere-sedia-ergonomica', 'Come scegliere la sedia ergonomica perfetta', 'ERGONOMIA', 
       'Una guida completa per trovare la sedia ergonomica ideale.', '/featured-1.jpg',
       '<p>Contenuto articolo...</p>', '8 min', TRUE),
      ('scrivanie-minimaliste-uffici', 'Scrivanie minimaliste per uffici moderni', 'DESIGN',
       'Less is more: come scegliere scrivanie minimaliste.', '/featured-2.jpg',
       '<p>Contenuto articolo...</p>', '6 min', TRUE),
      ('arredare-coworking', 'Come arredare uno spazio di coworking', 'GUIDE',
       'Spazi flessibili, comfort e design.', '/featured-3.jpg',
       '<p>Contenuto articolo...</p>', '10 min', TRUE)
    `);
  }

  console.log("Database initialized successfully!");
}

initDb().then(() => process.exit(0)).catch((err) => {
  console.error("Database init failed:", err);
  process.exit(1);
});

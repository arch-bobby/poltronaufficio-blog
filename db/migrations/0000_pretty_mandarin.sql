CREATE TABLE `blog_articles` (
	`id` serial AUTO_INCREMENT,
	`slug` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`category` varchar(100) NOT NULL,
	`excerpt` text,
	`coverImage` varchar(500),
	`content` text NOT NULL,
	`readTime` varchar(20),
	`published` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `blog_articles_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `social_posts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`articleId` bigint unsigned NOT NULL,
	`platform` enum('facebook','instagram','linkedin') NOT NULL,
	`status` enum('pending','posted','failed') NOT NULL DEFAULT 'pending',
	`externalId` varchar(255),
	`errorMessage` text,
	`postedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `social_posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`unionId` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(320),
	`avatar` text,
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`lastSignInAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_unionId_unique` UNIQUE(`unionId`)
);
--> statement-breakpoint
ALTER TABLE `social_posts` ADD CONSTRAINT `social_posts_articleId_blog_articles_id_fk` FOREIGN KEY (`articleId`) REFERENCES `blog_articles`(`id`) ON DELETE no action ON UPDATE no action;
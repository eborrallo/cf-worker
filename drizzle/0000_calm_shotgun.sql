CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`token` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `addressIdx` ON `user` (`name`);
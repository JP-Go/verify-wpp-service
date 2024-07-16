CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`hashed_password` text NOT NULL,
	`hashed_token` text,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `verified_contacts` (
	`id` integer PRIMARY KEY NOT NULL,
	`request_id` integer NOT NULL,
	`number` text NOT NULL,
	`name` text,
	`on_whatsapp` integer DEFAULT false NOT NULL,
	`verified_at` integer,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`request_id`) REFERENCES `verification_requests`(`id`) ON UPDATE cascade ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `verification_requests` (
	`id` integer PRIMARY KEY NOT NULL,
	`request_kind` text NOT NULL,
	`request_identity` text NOT NULL,
	`requested_by` integer NOT NULL,
	`whatsapp_used` integer NOT NULL,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`requested_by`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE set null,
	FOREIGN KEY (`whatsapp_used`) REFERENCES `whatsapps`(`id`) ON UPDATE cascade ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `whatsapps` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`number` text NOT NULL,
	`status` text NOT NULL,
	`qrcode` text,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP)
);

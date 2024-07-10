import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  username: text('username').notNull(),
  hashedPassword: text('hashed_password').notNull(),
  hashedToken: text('hashed_token').default(null),
  createdAt: integer('created_at').default(new Date().getTime()),
  updatedAt: integer('updated_at').default(new Date().getTime()),
});

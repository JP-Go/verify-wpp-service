import { relations, sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { verificationRequests } from './verification-request';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  username: text('username').notNull(),
  hashedPassword: text('hashed_password').notNull(),
  hashedToken: text('hashed_token'),
  createdAt: integer('created_at', {
    mode: 'timestamp',
  }).default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer('updated_at', {
    mode: 'timestamp',
  }).default(sql`(CURRENT_TIMESTAMP)`),
});

export const usersRelations = relations(users, ({ many }) => ({
  verificationRequests: many(verificationRequests, {
    relationName: 'requested_by',
  }),
}));

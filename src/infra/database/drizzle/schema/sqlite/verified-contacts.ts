import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { verificationRequests } from './verification-request';
import { relations, sql } from 'drizzle-orm';

export const verifiedContacts = sqliteTable('verified_contacts', {
  id: integer('id').primaryKey(),
  requestId: integer('request_id')
    .references(() => verificationRequests.id, {
      onUpdate: 'cascade',
      onDelete: 'set null',
    })
    .notNull(),
  number: text('number').notNull(),
  name: text('name'),
  onWhatsApp: integer('on_whatsapp', {
    mode: 'boolean',
  })
    .notNull()
    .default(false),
  verifiedAt: integer('verified_at', {
    mode: 'timestamp',
  }),
  createdAt: integer('created_at', {
    mode: 'timestamp',
  }).default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer('updated_at', {
    mode: 'timestamp',
  }).default(sql`(CURRENT_TIMESTAMP)`),
});

export const verifiedContactsRelations = relations(
  verifiedContacts,
  ({ one }) => ({
    requestId: one(verificationRequests, {
      fields: [verifiedContacts.requestId],
      references: [verificationRequests.id],
    }),
  }),
);

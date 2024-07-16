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
  onWhatsApp: integer('on_whatsapp').default(0).$type<boolean>(),
  verifiedAt: integer('verified_at').$type<Date>(),
  createdAt: integer('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$type<Date>(),
  updatedAt: integer('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$type<Date>(),
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

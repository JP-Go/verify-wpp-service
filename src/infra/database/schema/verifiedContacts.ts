import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { verificationRequests } from './verificationRequest';

export const verifiedContacts = sqliteTable('verified_contacts', {
  id: integer('id').primaryKey(),
  requestId: integer('request_id').references(() => verificationRequests.id, {
    onUpdate: 'cascade',
    onDelete: 'set null',
  }),
  number: text('number').notNull(),
  name: text('name'),
  onWhatsApp: integer('on_whatsapp').default(0),
  verifiedAt: integer('verified_at').default(null),
  createdAt: integer('created_at').default(new Date().getTime()),
  updatedAt: integer('updated_at').default(new Date().getTime()),
});

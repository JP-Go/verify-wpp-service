import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { whatsapps } from './whatsapps';

export const verificationRequests = sqliteTable('verification_requests', {
  id: integer('id').primaryKey(),
  requestKind: text('request_kind').notNull(),
  requestIdentity: text('request_identity'),
  requestedBy: integer('requested_by').references(() => users.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  whatsappUsed: integer('whatsapp_used').references(() => whatsapps.id, {
    onUpdate: 'cascade',
    onDelete: 'set null',
  }),
  createdAt: integer('created_at').default(new Date().getTime()),
  updatedAt: integer('updated_at').default(new Date().getTime()),
});

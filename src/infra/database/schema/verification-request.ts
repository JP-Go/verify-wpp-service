import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { whatsapps } from './whatsapps';
import { relations, sql } from 'drizzle-orm';

export const verificationRequests = sqliteTable('verification_requests', {
  id: integer('id').primaryKey(),
  requestKind: text('request_kind').notNull(),
  requestIdentity: text('request_identity'),
  requestedBy: integer('requested_by')
    .references(() => users.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    })
    .notNull(),
  whatsappUsed: integer('whatsapp_used')
    .references(() => whatsapps.id, {
      onUpdate: 'cascade',
      onDelete: 'set null',
    })
    .notNull(),
  createdAt: integer('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$type<Date>(),
  updatedAt: integer('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$type<Date>(),
});

export const verificationRequestRelations = relations(
  verificationRequests,
  ({ one }) => ({
    requestedBy: one(users, {
      fields: [verificationRequests.requestedBy],
      references: [users.id],
      relationName: 'requested_by',
    }),
    whatsappUsed: one(whatsapps, {
      fields: [verificationRequests.whatsappUsed],
      references: [whatsapps.id],

      relationName: 'whatsapp_used',
    }),
  }),
);

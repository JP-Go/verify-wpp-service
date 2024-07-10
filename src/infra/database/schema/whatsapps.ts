import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const whatsapps = sqliteTable('whatsapps', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  number: text('number').notNull(),
  qrcode: text('qrcode').default(null),
  status: text('status'),
  createdAt: integer('created_at').default(new Date().getTime()),
  updatedAt: integer('updated_at').default(new Date().getTime()),
});

import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const whatsapps = sqliteTable('whatsapps', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  number: text('number').notNull(),
  status: text('status').notNull(),
  qrcode: text('qrcode'),
  createdAt: integer('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$type<Date>(),
  updatedAt: integer('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$type<Date>(),
});

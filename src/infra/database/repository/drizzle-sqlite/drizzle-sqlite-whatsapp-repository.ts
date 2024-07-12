import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { WhatsApp } from '@/domain/entities/whatsapp';
import { WhatsAppRepository } from '@/domain/repositories/whatsapp-repository';
import * as schema from '@/infra/database/schema';

@Injectable()
export class DrizzleSQLiteWhatsAppRepository implements WhatsAppRepository {
  constructor(
    @Inject('DB_DEV') private database: BetterSQLite3Database<typeof schema>,
  ) {}
  async findByNumber(number: string) {
    const existing = await this.database.query.whatsapps.findFirst({
      where: eq(schema.whatsapps.number, number),
    });
    if (existing === undefined) {
      return undefined;
    }
    return WhatsApp.fromModel(existing);
  }
  async save(whatsapp: WhatsApp) {
    const saved = this.database
      .insert(schema.whatsapps)
      .values({
        number: whatsapp.number,
        name: whatsapp.name,
        status: 'DISCONNECTED',
      })
      .returning()
      .get();

    return WhatsApp.fromModel(saved);
  }
}

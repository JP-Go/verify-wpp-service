import { Global, Module } from '@nestjs/common';
import * as schema from '@/infra/database/drizzle-sqlite/schema';
import { DrizzleBetterSQLiteModule } from '@knaadh/nestjs-drizzle-better-sqlite3';
import { WhatsAppRepository } from '@/domain/repositories/whatsapp-repository';
import { DrizzleSQLiteWhatsAppRepository } from './drizzle-sqlite/repository/drizzle-sqlite-whatsapp-repository';
import { VerificationRequestRepository } from '@/domain/repositories/verification-request-repository';
import { DrizzleSQLiteVerificationRequestRepository } from './drizzle-sqlite/repository/dizzle-sqlite-verification-request-repository';
import { DrizzleSQLiteVerificationRequestMapper } from './drizzle-sqlite/mappers/verification-request-mapper';
import { DrizzleSQLiteWhatsappMapper } from './drizzle-sqlite/mappers/whatsapp-mapper';
import { DrizzleSQLiteVerifiedContactsMapper } from './drizzle-sqlite/mappers/verified-contacts-mapper';

// TODO: Implement user repository
@Global()
@Module({
  imports: [
    DrizzleBetterSQLiteModule.register({
      tag: 'DB_DEV',
      sqlite3: {
        filename: './db.sqlite',
      },
      config: {
        schema: { ...schema },
      },
    }),
  ],
  providers: [
    {
      provide: WhatsAppRepository,
      useClass: DrizzleSQLiteWhatsAppRepository,
    },
    {
      provide: VerificationRequestRepository,
      useClass: DrizzleSQLiteVerificationRequestRepository,
    },
    DrizzleSQLiteVerificationRequestMapper,
    DrizzleSQLiteWhatsappMapper,
    DrizzleSQLiteVerifiedContactsMapper,
  ],
  exports: [WhatsAppRepository, VerificationRequestRepository],
})
export class DatabaseModule {}

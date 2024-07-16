import { Global, Module } from '@nestjs/common';
import * as schema from '@/infra/database/drizzle/schema/sqlite';
import { DrizzleBetterSQLiteModule } from '@knaadh/nestjs-drizzle-better-sqlite3';
import { WhatsAppRepository } from '@/domain/repositories/whatsapp-repository';
import { VerificationRequestRepository } from '@/domain/repositories/verification-request-repository';
import { DrizzleSQLiteWhatsAppRepository } from './drizzle/repository/drizzle-whatsapp-repository';
import { DrizzleVerificationRequestRepository } from './drizzle/repository/dizzle-verification-request-repository';
import { DrizzleVerificationRequestMapper } from './drizzle/mappers/verification-request-mapper';
import { DrizzleWhatsappMapper } from './drizzle/mappers/whatsapp-mapper';
import { DrizzleVerifiedContactsMapper } from './drizzle/mappers/verified-contacts-mapper';

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
        logger: true,
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
      useClass: DrizzleVerificationRequestRepository,
    },
    DrizzleVerificationRequestMapper,
    DrizzleWhatsappMapper,
    DrizzleVerifiedContactsMapper,
  ],
  exports: [WhatsAppRepository, VerificationRequestRepository],
})
export class DatabaseModule {}

import { Global, Module } from '@nestjs/common';
import { DrizzleBetterSQLiteModule } from '@knaadh/nestjs-drizzle-better-sqlite3';
import { VerifiedContactsRepository } from '@/domain/repositories/verified-contacts';
import { WhatsAppRepository } from '@/domain/repositories/whatsapp-repository';
import { VerificationRequestRepository } from '@/domain/repositories/verification-request-repository';
import * as schema from '@/infra/database/drizzle/schema/sqlite';
import { DrizzleSQLiteWhatsAppRepository } from './drizzle/repository/drizzle-whatsapp-repository';
import { DrizzleVerificationRequestRepository } from './drizzle/repository/dizzle-verification-request-repository';
import { DrizzleVerificationRequestMapper } from './drizzle/mappers/verification-request-mapper';
import { DrizzleWhatsappMapper } from './drizzle/mappers/whatsapp-mapper';
import { DrizzleVerifiedContactsMapper } from './drizzle/mappers/verified-contacts-mapper';
import { DrizzleVerifiedContactsRepository } from './drizzle/repository/drizzle-verified-contacts-repository';

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
    {
      provide: VerifiedContactsRepository,
      useClass: DrizzleVerifiedContactsRepository,
    },
    DrizzleVerificationRequestMapper,
    DrizzleWhatsappMapper,
    DrizzleVerifiedContactsMapper,
  ],
  exports: [
    WhatsAppRepository,
    VerificationRequestRepository,
    VerifiedContactsRepository,
  ],
})
export class DatabaseModule {}

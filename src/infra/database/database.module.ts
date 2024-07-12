import { Global, Module } from '@nestjs/common';
import * as schema from '@/infra/database/schema';
import { DrizzleBetterSQLiteModule } from '@knaadh/nestjs-drizzle-better-sqlite3';
import { WhatsAppRepository } from '@/domain/repositories/whatsapp-repository';
import { DrizzleSQLiteWhatsAppRepository } from './repository/drizzle-sqlite/drizzle-sqlite-whatsapp-repository';
import { VerificationRequestRepository } from '@/domain/repositories/verification-request-repository';
import { DrizzleSQLiteVerificationRequestRepository } from './repository/drizzle-sqlite/dizzle-sqlite-verification-request-repository';

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
  ],
  exports: [WhatsAppRepository, VerificationRequestRepository],
})
export class DatabaseModule {}

import { VerificationRequest } from '@/domain/entities/verification-request';
import { VerificationRequestRepository } from '@/domain/repositories/verification-request-repository';
import { Inject, Injectable } from '@nestjs/common';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '@/infra/database/schema';

@Injectable()
export class DrizzleSQLiteVerificationRequestRepository
  implements VerificationRequestRepository
{
  constructor(
    @Inject('DB_DEV') private database: BetterSQLite3Database<typeof schema>,
  ) {}

  async save(verificationRequest: VerificationRequest) {
    const request = this.database
      .insert(schema.verificationRequests)
      .values({
        whatsappUsed: verificationRequest.whatsappUsed,
        requestedBy: verificationRequest.requestedBy,
        requestKind: verificationRequest.requestKind,
      })
      .returning()
      .get();
    return VerificationRequest.fromModel(request);
  }
  async findById(verificationRequestId: number) {
    return VerificationRequest.fromModel(
      await this.database.query.verificationRequests.findFirst({
        where: (request, { eq }) => {
          return eq(request.id, verificationRequestId);
        },
      }),
    );
  }
}

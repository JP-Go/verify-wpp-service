import { VerificationRequest } from '@/domain/entities/verification-request';
import { VerificationRequestRepository } from '@/domain/repositories/verification-request-repository';
import { Inject, Injectable } from '@nestjs/common';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../schema/sqlite';
import { DrizzleVerificationRequestMapper } from '../mappers/verification-request-mapper';

@Injectable()
export class DrizzleVerificationRequestRepository
  implements VerificationRequestRepository
{
  constructor(
    @Inject('DB_DEV') private database: BetterSQLite3Database<typeof schema>,
    private drizzleSQLiteVerificationRequestMapper: DrizzleVerificationRequestMapper,
  ) {}

  async save(verificationRequest: VerificationRequest) {
    const request = this.database
      .insert(schema.verificationRequests)
      .values({
        whatsappUsed: verificationRequest.whatsappUsed.id,
        requestedBy: verificationRequest.requestedBy,
        requestKind: verificationRequest.requestKind,
      })
      .returning()
      .get();
    const whatsappUsed = await this.database.query.whatsapps.findFirst({
      where: (request, { eq }) => {
        return eq(request.id, verificationRequest.whatsappUsed.id);
      },
    });
    return this.drizzleSQLiteVerificationRequestMapper.toDomain(
      request,
      whatsappUsed,
      [],
    );
  }
  async findById(verificationRequestId: number) {
    const model = await this.database.query.verificationRequests.findFirst({
      where: (request, { eq }) => {
        return eq(request.id, verificationRequestId);
      },
      with: {
        whatsappUsed: true,
        verifiedContacts: true,
      },
    });
    return this.drizzleSQLiteVerificationRequestMapper.toDomain(
      model,
      model.whatsappUsed,
      model.verifiedContacts,
    );
  }
}

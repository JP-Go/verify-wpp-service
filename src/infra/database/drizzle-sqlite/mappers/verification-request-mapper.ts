import { Injectable } from '@nestjs/common';
import {
  verificationRequests,
  verifiedContacts as verifiedContactsModel,
  whatsapps,
} from '../schema';
import { VerificationRequest } from '@/domain/entities/verification-request';
import { DrizzleSQLiteVerifiedContactsMapper } from './verified-contacts-mapper';
import { DrizzleSQLiteWhatsappMapper } from './whatsapp-mapper';

@Injectable()
export class DrizzleSQLiteVerificationRequestMapper {
  constructor(
    private verifiedContactsMapper: DrizzleSQLiteVerifiedContactsMapper,
    private whatsappMapper: DrizzleSQLiteWhatsappMapper,
  ) {}
  toDomain(
    verificationRequestModel: typeof verificationRequests.$inferSelect,
    whatsapp: typeof whatsapps.$inferSelect,
    verifiedContacts: (typeof verifiedContactsModel.$inferSelect)[],
  ) {
    return new VerificationRequest(
      {
        createdAt: new Date(verificationRequestModel.createdAt),
        updatedAt: new Date(verificationRequestModel.updatedAt),
        requestedBy: verificationRequestModel.requestedBy,
        whatsappUsed: this.whatsappMapper.toDomain(whatsapp),
        requestKind: verificationRequestModel.requestKind as 'SINGLE' | 'LOT',
        requestIdentity: verificationRequestModel.requestIdentity,
        verifiedContacts:
          verifiedContacts === null
            ? []
            : verifiedContacts.map((verifiedContact) =>
                this.verifiedContactsMapper.toDomain(verifiedContact),
              ),
      },
      verificationRequestModel.id,
    );
  }
}

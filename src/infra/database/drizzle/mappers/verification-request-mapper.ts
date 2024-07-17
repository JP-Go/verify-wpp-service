import { Injectable } from '@nestjs/common';
import {
  verificationRequests,
  verifiedContacts as verifiedContactsModel,
  whatsapps,
} from '../schema/sqlite';
import { VerificationRequest } from '@/domain/entities/verification-request';
import { DrizzleVerifiedContactsMapper } from './verified-contacts-mapper';
import { DrizzleWhatsappMapper } from './whatsapp-mapper';

@Injectable()
export class DrizzleVerificationRequestMapper {
  constructor(
    private verifiedContactsMapper: DrizzleVerifiedContactsMapper,
    private whatsappMapper: DrizzleWhatsappMapper,
  ) {}
  toDomain(
    verificationRequestModel: typeof verificationRequests.$inferSelect,
    whatsapp: typeof whatsapps.$inferSelect,
    verifiedContacts: (typeof verifiedContactsModel.$inferSelect)[],
  ) {
    return verificationRequestModel === null
      ? null
      : new VerificationRequest(
          {
            createdAt: new Date(verificationRequestModel.createdAt),
            updatedAt: new Date(verificationRequestModel.updatedAt),
            requestedBy: verificationRequestModel.requestedBy,
            whatsappUsed: this.whatsappMapper.toDomain(whatsapp),
            requestKind: verificationRequestModel.requestKind as
              | 'SINGLE'
              | 'LOT',
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

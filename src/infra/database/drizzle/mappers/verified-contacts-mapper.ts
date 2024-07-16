import { VerifiedContact } from '@/domain/entities/verified-contact';
import { verifiedContacts } from '../schema/sqlite';

export class DrizzleVerifiedContactsMapper {
  toDomain(verifiedContactModel: typeof verifiedContacts.$inferSelect | null) {
    return verifiedContactModel === null
      ? null
      : new VerifiedContact({
          ...verifiedContactModel,
          verifiedAt: verifiedContactModel.verifiedAt
            ? new Date(verifiedContactModel.verifiedAt)
            : null,
        });
  }
}

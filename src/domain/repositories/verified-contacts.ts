import { VerifiedContact } from '../entities/verified-contact';

export abstract class VerifiedContactsRepository {
  abstract save(verifiedContact: VerifiedContact): Promise<VerifiedContact>;
  abstract findByRequestId(requestId: number): Promise<VerifiedContact[]>;
  abstract findById(contactId: number): Promise<VerifiedContact | undefined>;
  abstract findByNumber(number: string): Promise<VerifiedContact | undefined>;
}

import { VerificationRequest } from '../entities/verification-request';

// TODO: Provide an implementation using drizzle sqlite3
export abstract class VerificationRequestRepository {
  abstract save(
    verificationRequest: VerificationRequest,
  ): Promise<VerificationRequest>;
  abstract findById(
    verificationRequestId: number,
  ): Promise<VerificationRequest | undefined>;
}

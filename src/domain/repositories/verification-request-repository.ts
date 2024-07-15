import { VerificationRequest } from '../entities/verification-request';

export abstract class VerificationRequestRepository {
  abstract save(
    verificationRequest: VerificationRequest,
  ): Promise<VerificationRequest>;
  abstract findById(
    verificationRequestId: number,
  ): Promise<VerificationRequest | undefined>;
}

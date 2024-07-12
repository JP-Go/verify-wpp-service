import { Injectable } from '@nestjs/common';
import { CreateVerificationRequestDTO } from '@/infra/http/dtos/create-verification-request.dto';
import { VerificationRequestRepository } from '@/domain/repositories/verification-request-repository';
import { VerificationRequest } from '@/domain/entities/verification-request';

@Injectable()
export class CreateVerificationRequestUseCase {
  constructor(
    private verificationRequestRepository: VerificationRequestRepository,
  ) {}

  async execute(createValidationRequestDTO: CreateVerificationRequestDTO) {
    const {
      kind,
      payload: { number },
    } = createValidationRequestDTO;

    const newRequest = this.verificationRequestRepository.save(
      new VerificationRequest({
        requestKind: kind,
        requestedBy: 1,
        whatsappUsed: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
        requestIdentity: `${new Date().toISOString()}-${kind}-${number}`,
        verifiedContacts: [],
      }),
    );
    return newRequest;
  }
}

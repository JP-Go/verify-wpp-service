import { Injectable } from '@nestjs/common';
import { CreateVerificationRequestDTO } from '@/infra/http/dtos/create-verification-request.dto';
import { VerificationRequestRepository } from '@/domain/repositories/verification-request-repository';
import { VerificationRequest } from '@/domain/entities/verification-request';
import { ProcessSingleVerificationRequestUseCase } from './process-single-verification-request';
import { VerifiedContact } from '@/domain/entities/verified-contact';
import { WhatsApp } from '@/domain/entities/whatsapp';

@Injectable()
export class CreateVerificationRequestUseCase {
  constructor(
    private verificationRequestRepository: VerificationRequestRepository,
    private processSingleVerificationRequest: ProcessSingleVerificationRequestUseCase,
  ) {}

  async execute(createValidationRequestDTO: CreateVerificationRequestDTO) {
    const {
      kind,
      payload: { number },
    } = createValidationRequestDTO;
    const now = new Date();

    let request = new VerificationRequest({
      requestKind: kind,
      requestedBy: 1,
      whatsappUsed: new WhatsApp({}, 1),
      updatedAt: new Date(now),
      createdAt: new Date(now),
      requestIdentity: `${new Date(now).toISOString()}-${kind}-${number}`,
      verifiedContacts: [],
    });

    request = await this.verificationRequestRepository.save(request);

    if (kind.toUpperCase() === 'SINGLE') {
      request.verifiedContacts.push(
        new VerifiedContact({
          name: '',
          requestId: request.id,
          number,
          onWhatsApp: false,
          verifiedAt: null,
          createdAt: new Date(now),
          updatedAt: new Date(now),
        }),
      );
      await this.processSingleVerificationRequest.execute(request);
    }
    // TODO: Handle the kind = 'LOT' case
    return request;
  }
}

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateVerificationRequestDTO } from '@/infra/http/dtos/create-verification-request.dto';
import { VerificationRequestRepository } from '@/domain/repositories/verification-request-repository';
import { VerificationRequest } from '@/domain/entities/verification-request';
import { VerifiedContact } from '@/domain/entities/verified-contact';
import { WhatsApp } from '@/domain/entities/whatsapp';

import { ProcessSingleVerificationRequestUseCase } from './process-single-verification-request';
import { ProcessLotVerificationRequestUseCase } from './process-lot-verification-request';

/**
 * Creates a new verification request. If the verification kind is 'SINGLE',
 * it will also process the request in place, returning the status of thet
 * request after processing.
 */
@Injectable()
export class CreateVerificationRequestUseCase {
  /**
   * @param verificationRequestRepository {VerificationRequestRepository}
   * @param processSingleVerificationRequestUseCase {ProcessSingleVerificationRequestUseCase}
   */
  constructor(
    private verificationRequestRepository: VerificationRequestRepository,
    private processSingleVerificationRequestUseCase: ProcessSingleVerificationRequestUseCase,
    private processLotVerificationRequestUseCase: ProcessLotVerificationRequestUseCase,
  ) {}

  async execute(
    createValidationRequestDTO: CreateVerificationRequestDTO,
    file: Express.Multer.File,
  ) {
    const { kind, payload } = createValidationRequestDTO;
    const now = new Date();

    if (kind.toUpperCase() === 'LOT' && !file) {
      throw new UnprocessableEntityException('Missing file');
    }

    const requestIdentity =
      kind.toUpperCase() === 'SINGLE'
        ? `${now.toISOString()}-${kind}-${payload.number}`
        : `${now.toISOString()}-${kind}-lot`;

    let request = new VerificationRequest({
      requestKind: kind,
      requestedBy: 1,
      whatsappUsed: new WhatsApp({}, 1),
      updatedAt: new Date(now),
      createdAt: new Date(now),
      requestIdentity,
      verifiedContacts: [],
    });

    request = await this.verificationRequestRepository.save(request);

    if (kind.toUpperCase() === 'SINGLE') {
      request.addContact(
        new VerifiedContact({
          name: '',
          requestId: request.id,
          number: payload.number,
          onWhatsApp: false,
          verifiedAt: null,
          createdAt: new Date(now),
          updatedAt: new Date(now),
        }),
      );
      await this.processSingleVerificationRequestUseCase.execute(request);
    } else {
      await this.processLotVerificationRequestUseCase.execute(request, file);
    }
    return request;
  }
}

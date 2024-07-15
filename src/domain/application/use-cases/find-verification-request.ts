import { Injectable } from '@nestjs/common';
import { VerificationRequestRepository } from '@/domain/repositories/verification-request-repository';

@Injectable()
export class FindVerificationRequestUseCase {
  constructor(
    private verificationRequestRepository: VerificationRequestRepository,
  ) {}

  async execute(id: number) {
    const request = await this.verificationRequestRepository.findById(id);

    return request;
  }
}

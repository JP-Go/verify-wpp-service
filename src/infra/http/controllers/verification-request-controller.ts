import { Body, Controller, Post } from '@nestjs/common';
import { CreateVerificationRequestDTO } from '../dtos/create-verification-request.dto';
import { CreateVerificationRequestUseCase } from '@/domain/application/use-cases/create-verification-request';
import { VerifyNumberUseCase } from '@/domain/application/use-cases/verify-number';

@Controller('/verification-request')
export class VerificationRequestController {
  constructor(
    private createVerificationRequestUseCase: CreateVerificationRequestUseCase,
    private verifyNumberUseCase: VerifyNumberUseCase,
  ) {}

  @Post()
  async createVerificationRequest(
    @Body() createVerificationRequestDTO: CreateVerificationRequestDTO,
  ) {
    return this.createVerificationRequestUseCase.execute(
      createVerificationRequestDTO,
    );
  }

  @Post('/test')
  async verifyWhatsapp(
    @Body() verificationRequest: { number: string; sessionId: string },
  ) {
    return {
      number: verificationRequest.number,
      valid: this.verifyNumberUseCase.execute(
        verificationRequest.number,
        verificationRequest.sessionId,
      ),
    };
  }
}

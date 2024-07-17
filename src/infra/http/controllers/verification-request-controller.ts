import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateVerificationRequestDTO } from '../dtos/create-verification-request.dto';
import { CreateVerificationRequestUseCase } from '@/domain/application/use-cases/create-verification-request';
import { VerifyNumberUseCase } from '@/domain/application/use-cases/verify-number';
import { FindVerificationRequestUseCase } from '@/domain/application/use-cases/find-verification-request';

@Controller('/verification-request')
export class VerificationRequestController {
  constructor(
    private findVerificationRequestUseCase: FindVerificationRequestUseCase,
    private createVerificationRequestUseCase: CreateVerificationRequestUseCase,
    private verifyNumberUseCase: VerifyNumberUseCase,
  ) {}

  @Post()
  async createVerificationRequest(
    @Body() createVerificationRequestDTO: CreateVerificationRequestDTO,
  ) {
    const request = await this.createVerificationRequestUseCase.execute(
      createVerificationRequestDTO,
    );
    return {
      requestId: request.id,
    };
  }

  @Get('/:id')
  async getVerificationRequest(@Param('id') id: number) {
    const verificationRequest =
      await this.findVerificationRequestUseCase.execute(id);
    if (verificationRequest === undefined) {
      throw new NotFoundException('Verification Request not found');
    }
    return {
      request: verificationRequest.toHTTP(),
    };
  }

  @Post('/test')
  async verifyWhatsapp(
    @Body() verificationRequest: { number: string; sessionId: string },
  ) {
    return {
      number: verificationRequest.number,
      valid: await this.verifyNumberUseCase.execute(
        verificationRequest.number,
        verificationRequest.sessionId,
      ),
    };
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { CreateVerificationRequestDTO } from '../dtos/create-verification-request.dto';
import { CreateVerificationRequestUseCase } from '@/domain/application/use-cases/create-verification-request';

@Controller('/verification-request')
export class VerificationRequestController {
  constructor(
    private createVerificationRequestUseCase: CreateVerificationRequestUseCase,
  ) {}

  @Post()
  async createVerificationRequest(
    @Body() createVerificationRequestDTO: CreateVerificationRequestDTO,
  ) {
    return this.createVerificationRequestUseCase.execute(
      createVerificationRequestDTO,
    );
  }
}

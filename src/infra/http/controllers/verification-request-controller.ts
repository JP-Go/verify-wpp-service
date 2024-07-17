import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateVerificationRequestDTO } from '../dtos/create-verification-request.dto';
import { CreateVerificationRequestUseCase } from '@/domain/application/use-cases/create-verification-request';
import { VerifyNumberUseCase } from '@/domain/application/use-cases/verify-number';
import { FindVerificationRequestUseCase } from '@/domain/application/use-cases/find-verification-request';
import { FileInterceptor } from '@nestjs/platform-express';

const ONE_MB_IN_BYTES = 1024 * 1024;

@Controller('/verification-request')
export class VerificationRequestController {
  constructor(
    private findVerificationRequestUseCase: FindVerificationRequestUseCase,
    private createVerificationRequestUseCase: CreateVerificationRequestUseCase,
    private verifyNumberUseCase: VerifyNumberUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createVerificationRequest(
    @Body() createVerificationRequestDTO: CreateVerificationRequestDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: ONE_MB_IN_BYTES,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const request = await this.createVerificationRequestUseCase.execute(
      createVerificationRequestDTO,
      file,
    );
    return {
      requestId: request.id,
      verifiedContacts: request.verifiedContacts,
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

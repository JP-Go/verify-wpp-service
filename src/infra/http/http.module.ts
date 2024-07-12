import { Module } from '@nestjs/common';
import { VerificationRequestController } from './controllers/verification-request-controller';
import { CreateVerificationRequestUseCase } from '@/domain/application/use-cases/create-verification-request';
import { WhatsAppController } from './controllers/whatsapp-controller';
import { CreateWhatsAppUseCase } from '@/domain/application/use-cases/create-whatsapp';

@Module({
  controllers: [VerificationRequestController, WhatsAppController],
  providers: [CreateVerificationRequestUseCase, CreateWhatsAppUseCase],
})
export class HTTPModule {}

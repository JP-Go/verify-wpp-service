import { Module } from '@nestjs/common';
import { VerificationRequestController } from './controllers/verification-request-controller';
import { CreateVerificationRequestUseCase } from '@/domain/application/use-cases/create-verification-request';
import { WhatsAppController } from './controllers/whatsapp-controller';
import { CreateWhatsAppUseCase } from '@/domain/application/use-cases/create-whatsapp';
import { VerifyNumberUseCase } from '@/domain/application/use-cases/verify-number';
import { WhatsAppVerificationService } from '@/domain/services/WhatsAppVerificationService';
import { BaileysWhatsappVerificationService } from '../services/baileys-whatsapp-verification-service';

@Module({
  controllers: [VerificationRequestController, WhatsAppController],
  providers: [
    CreateVerificationRequestUseCase,
    CreateWhatsAppUseCase,
    VerifyNumberUseCase,
    {
      provide: WhatsAppVerificationService,
      useClass: BaileysWhatsappVerificationService,
    },
  ],
})
export class HTTPModule {}

import { Module } from '@nestjs/common';
import { CreateVerificationRequestUseCase } from '@/domain/application/use-cases/create-verification-request';
import { CreateWhatsAppUseCase } from '@/domain/application/use-cases/create-whatsapp';
import { VerifyNumberUseCase } from '@/domain/application/use-cases/verify-number';
import { WhatsAppVerificationService } from '@/domain/services/WhatsAppVerificationService';
import { ProcessSingleVerificationRequestUseCase } from '@/domain/application/use-cases/process-single-verification-request';
import { FindVerificationRequestUseCase } from '@/domain/application/use-cases/find-verification-request';

import { BaileysWhatsappVerificationService } from '../services/baileys-whatsapp-verification-service';
import { VerificationRequestController } from './controllers/verification-request-controller';
import { WhatsAppController } from './controllers/whatsapp-controller';
@Module({
  controllers: [VerificationRequestController, WhatsAppController],
  providers: [
    CreateVerificationRequestUseCase,
    CreateWhatsAppUseCase,
    VerifyNumberUseCase,
    ProcessSingleVerificationRequestUseCase,
    FindVerificationRequestUseCase,
    {
      provide: WhatsAppVerificationService,
      useClass: BaileysWhatsappVerificationService,
    },
  ],
})
export class HTTPModule {}

import { WhatsAppVerificationService } from '@/domain/services/WhatsAppVerificationService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VerifyNumberUseCase {
  constructor(private verificationService: WhatsAppVerificationService) {}

  execute(number: string, sessionId: string) {
    return this.verificationService.verifyNumber(number, sessionId);
  }
}

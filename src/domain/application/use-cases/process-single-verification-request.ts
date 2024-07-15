import { VerificationRequest } from '@/domain/entities/verification-request';
import { WhatsAppVerificationService } from '@/domain/services/WhatsAppVerificationService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProcessSingleVerificationRequestUseCase {
  constructor(private verificationService: WhatsAppVerificationService) {}

  async execute(verificationRequest: VerificationRequest) {
    const [contact] = verificationRequest.verifiedContacts;
    const contactExists = await this.verificationService.verifyNumber(
      contact.number,
      verificationRequest.whatsappUsed.number,
    );
    contact.setOnWhatsApp(contactExists);
  }
}

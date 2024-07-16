import { VerificationRequest } from '@/domain/entities/verification-request';
import { WhatsAppVerificationService } from '@/domain/services/WhatsAppVerificationService';
import { Injectable } from '@nestjs/common';

/**
 * Processes a verification request with one contact to verify. If the contact is on WhatsApp, it
 * updates it's onWhatApp property.
 */
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

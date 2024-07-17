import { VerificationRequest } from '@/domain/entities/verification-request';
import { VerifiedContactsRepository } from '@/domain/repositories/verified-contacts';
import { WhatsAppVerificationService } from '@/domain/services/WhatsAppVerificationService';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

/**
 * Processes a verification request with one contact to verify. If the contact is on WhatsApp, it
 * updates it's onWhatApp property.
 */
@Injectable()
export class ProcessSingleVerificationRequestUseCase {
  constructor(
    //TODO: attach verification service
    private verificationService: WhatsAppVerificationService,
    private verifiedContactsRepository: VerifiedContactsRepository,
  ) {}

  async execute(verificationRequest: VerificationRequest) {
    const [contact] = verificationRequest.verifiedContacts;
    const onWhatsappOrError = await this.verificationService
      .verifyNumber(contact.number, verificationRequest.whatsappUsed.number)
      .catch((error) => {
        Logger.error(error, {
          context: {
            method: 'verifyNumber',
            class: 'verificationService',
            params: {
              number: contact.number,
              sessionId: verificationRequest.whatsappUsed.number,
            },
          },
        });

        return error;
      });
    if (onWhatsappOrError instanceof Error) {
      throw new InternalServerErrorException(onWhatsappOrError);
    }
    const onWhatsapp = onWhatsappOrError;
    contact.setOnWhatsApp(onWhatsapp);
    this.verifiedContactsRepository.save(contact);
  }
}

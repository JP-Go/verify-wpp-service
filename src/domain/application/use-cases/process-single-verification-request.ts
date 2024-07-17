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
    private verificationService: WhatsAppVerificationService,
    private verifiedContactsRepository: VerifiedContactsRepository,
  ) {}

  async execute(verificationRequest: VerificationRequest) {
    const [contact] = verificationRequest.verifiedContacts;
    const existingContact = await this.verifiedContactsRepository.findByNumber(
      contact.number,
    );
    let onWhatsApp: boolean = false;

    if (existingContact !== undefined) {
      Logger.log('contact already checked');
      onWhatsApp = existingContact.onWhatsApp;
      contact.setName(existingContact.name);
    } else {
      const onWhatsappOrError = await this.verificationService
        .verifyNumber(contact.number, verificationRequest.whatsappUsed.number)
        .catch((error) => {
          Logger.error(error.toString(), {
            context: {
              method: 'verifyNumber',
              class: 'verificationService',
              params: {
                number: contact.number,
                sessionId: verificationRequest.whatsappUsed.number,
              },
            },
          });
          return error as Error;
        });
      if (onWhatsappOrError instanceof Error) {
        throw new InternalServerErrorException(onWhatsappOrError.message);
      }

      onWhatsApp = onWhatsappOrError;
    }

    contact.setOnWhatsApp(onWhatsApp);

    return this.verifiedContactsRepository.save(contact);
  }
}

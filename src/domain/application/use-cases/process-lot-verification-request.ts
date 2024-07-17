import { VerificationRequest } from '@/domain/entities/verification-request';
import {
  VerifiedContact,
  VerifiedContactProps,
} from '@/domain/entities/verified-contact';
import { VerifiedContactsRepository } from '@/domain/repositories/verified-contacts';
import { WhatsAppVerificationService } from '@/domain/services/WhatsAppVerificationService';
import { Injectable } from '@nestjs/common';
import { Readable, Transform, Writable } from 'node:stream';

/**
 * Processes a verification request with one contact to verify. If the contact is on WhatsApp, it
 * updates it's onWhatApp property.
 */
@Injectable()
export class ProcessLotVerificationRequestUseCase {
  constructor(
    private verificationService: WhatsAppVerificationService,
    private verifiedContactsRepository: VerifiedContactsRepository,
  ) {}

  async execute(
    verificationRequest: VerificationRequest,
    file: Express.Multer.File,
  ) {
    const reader = function* () {
      for (const line of file.buffer.toString().split('\n')) {
        yield line;
      }
      return true;
    };
    const fileReader = reader();
    const fileReadingStream = new Readable({
      read() {
        let data = fileReader.next();
        while (!data.done) {
          this.push(data.value.toString());
          data = fileReader.next();
        }
        this.push(null);
      },
    });

    const checkAndSaveStream = new Transform({
      transform: async (line: Buffer, encoding, next) => {
        if (line === null) {
          return next(null, null);
        }
        const [name, number] = line.toString().split(',');
        let contact = new VerifiedContact({
          number,
          name,
          createdAt: new Date(),
          updatedAt: new Date(),
          requestId: verificationRequest.id,
          onWhatsApp: false,
          verifiedAt: null,
        });
        const onWhatsAppOrError = await this.verificationService
          .verifyNumber(number, verificationRequest.whatsappUsed.number)
          .catch((error) => error as Error);
        if (onWhatsAppOrError instanceof Error) {
          return next(onWhatsAppOrError, null);
        }
        contact.setOnWhatsApp(onWhatsAppOrError);
        contact = await this.verifiedContactsRepository.save(contact);
        next(null, JSON.stringify(contact));
        return verificationRequest;
      },
    });

    const writeToRequestStream = new Writable({
      write(contact: Buffer, encoding, next) {
        const newContact = JSON.parse(contact.toString()) as {
          props: VerifiedContactProps;
          _id: number;
        };
        verificationRequest.addContact(
          new VerifiedContact(newContact.props, newContact._id),
        );
        next();
      },
    });
    fileReadingStream.pipe(checkAndSaveStream);
    checkAndSaveStream.pipe(writeToRequestStream);
    await new Promise((resolve) => {
      writeToRequestStream.on('finish', () => {
        resolve(verificationRequest);
      });
    });
  }
}

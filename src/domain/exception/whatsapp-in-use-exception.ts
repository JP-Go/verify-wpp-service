import { UnprocessableEntityException } from '@nestjs/common';

export class WhatsAppInUseException extends UnprocessableEntityException {
  constructor() {
    super('Number already in use');
  }
}

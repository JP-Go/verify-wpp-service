import { WhatsApp } from '../entities/whatsapp';

export abstract class WhatsAppRepository {
  abstract findByNumber(number: string): Promise<WhatsApp | undefined>;
  abstract save(whatsapp: WhatsApp): Promise<WhatsApp>;
}

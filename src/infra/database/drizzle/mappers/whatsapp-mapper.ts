import { WhatsApp } from '@/domain/entities/whatsapp';
import { whatsapps } from '../schema/sqlite';

export class DrizzleWhatsappMapper {
  toDomain(whatsappModel: typeof whatsapps.$inferSelect | null) {
    return whatsappModel === null
      ? null
      : new WhatsApp(
          {
            name: whatsappModel.name,
            number: whatsappModel.number,
            qrcode: whatsappModel.qrcode,
            status: whatsappModel.status,
            createdAt: new Date(whatsappModel.createdAt),
            updatedAt: new Date(whatsappModel.updatedAt),
          },
          whatsappModel.id,
        );
  }
}

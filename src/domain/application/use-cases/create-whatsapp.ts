import { Injectable } from '@nestjs/common';
import { WhatsAppInUseException } from '@/domain/exception/whatsapp-in-use-exception';
import { WhatsApp } from '@/domain/entities/whatsapp';
import { CreateWhatsAppDTO } from '@/infra/http/dtos/create-whatsapp.dto';
import { WhatsAppRepository } from '@/domain/repositories/whatsapp-repository';
import { WhatsAppVerificationService } from '@/domain/services/WhatsAppVerificationService';

@Injectable()
export class CreateWhatsAppUseCase {
  constructor(
    private readonly whatsappRepository: WhatsAppRepository,
    private readonly verificationService: WhatsAppVerificationService,
  ) {}

  async execute(createWhatsAppDTO: CreateWhatsAppDTO) {
    const existingWhatsApp = await this.whatsappRepository.findByNumber(
      createWhatsAppDTO.number,
    );
    if (existingWhatsApp !== undefined) {
      throw new WhatsAppInUseException();
    }

    // await this.verificationService.createConnection(createWhatsAppDTO.number);
    const whatsapp = await this.whatsappRepository.save(
      new WhatsApp({
        number: createWhatsAppDTO.number,
        name: createWhatsAppDTO.name,
        status: 'DISCONNECTED',
        qrcode: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    return whatsapp;
  }
}

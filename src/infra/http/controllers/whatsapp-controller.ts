import { Body, Controller, Post } from '@nestjs/common';
import { CreateWhatsAppDTO } from '../dtos/create-whatsapp.dto';
import { CreateWhatsAppUseCase } from '@/domain/application/use-cases/create-whatsapp';

@Controller('/whatsapp')
export class WhatsAppController {
  constructor(private createWhatsAppUseCase: CreateWhatsAppUseCase) {}

  @Post()
  async createWhatsApp(@Body() createWhatsAppDTO: CreateWhatsAppDTO) {
    const whatsapp =
      await this.createWhatsAppUseCase.execute(createWhatsAppDTO);
    return whatsapp.toHTTP();
  }
}

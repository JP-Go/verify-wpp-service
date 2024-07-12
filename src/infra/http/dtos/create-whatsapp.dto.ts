import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class CreateWhatsAppDTO {
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(11, 13)
  number: string;
}

import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export enum VerificationRequestKind {
  Single = 'single',
  Lot = 'lot',
}
export class SingleValidationDTO {
  @IsNotEmpty()
  @IsNumberString()
  @IsString()
  number: string;
}

export class CreateVerificationRequestDTO {
  @IsEnum(VerificationRequestKind)
  @IsNotEmpty()
  kind: 'SINGLE' | 'LOT';

  @IsNotEmpty()
  requestedBy: string;

  @ValidateIf((obj) => obj.kind === 'single')
  @ValidateNested()
  @IsNotEmpty()
  @IsObject()
  payload: SingleValidationDTO;
}

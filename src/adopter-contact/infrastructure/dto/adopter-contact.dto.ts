import { IsBoolean, IsIn, IsNotEmpty, IsString } from 'class-validator';

type TypeOfContact = 'celular' | 'telefone' | 'whatsapp';

export class AdopterContactDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsBoolean()
  @IsNotEmpty()
  isPrincipal: boolean;

  @IsString()
  @IsNotEmpty()
  @IsIn(['celular', 'telefone', 'whatsapp'])
  type: TypeOfContact;
}

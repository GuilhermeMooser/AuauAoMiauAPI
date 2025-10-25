import { ApiProperty } from '@nestjs/swagger';

type TypeOfContact = 'celular' | 'telefone' | 'whatsapp';

export class AdopterContactPresenter {
  @ApiProperty({
    description: 'Id',
  })
  id: string;

  @ApiProperty({
    description: 'Value',
  })
  value: string;

  @ApiProperty({
    description: 'Principal contact',
  })
  isPrincipal: boolean;

  @ApiProperty({
    description: 'Type of contact',
  })
  type: TypeOfContact;
}

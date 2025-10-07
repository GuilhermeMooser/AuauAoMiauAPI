import { ApiProperty } from '@nestjs/swagger';

export class StateUfPresenter {
  @ApiProperty({
    description: 'Id',
  })
  id: number;

  @ApiProperty({
    description: 'Name',
  })
  name: string;

  @ApiProperty({
    description: 'Acronym',
  })
  acronym: string;

  @ApiProperty({
    description: 'Country',
  })
  country: string;
}

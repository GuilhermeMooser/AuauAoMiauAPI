import { StateUfPresenter } from '@/state-uf/infrastructure/presenters/state-uf.presenter';
import { ApiProperty } from '@nestjs/swagger';

export class CityPresenter {
  @ApiProperty({
    description: 'Id',
  })
  id: number;

  @ApiProperty({
    description: 'Name',
  })
  name: string;

  @ApiProperty({
    description: 'IBGE code',
  })
  ibge: number;

  @ApiProperty({
    description: 'State',
  })
  stateUf: StateUfPresenter;
}

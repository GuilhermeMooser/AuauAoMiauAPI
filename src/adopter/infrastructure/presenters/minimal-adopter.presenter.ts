import { AdopterAddressPresenter } from '@/adopter-address/infrastructure/presenters/adopter-address.presenter';
import { AdopterContactPresenter } from '@/adopter-contact/infrastructure/presenters/adopter-contact.presenter';
import { AnimalPresenter } from '@/animals/infrastructure/presenters/animal.presenter';
import type { Audit } from '@/shared/domain/entity';
import { ApiProperty } from '@nestjs/swagger';

export class MinimalAdopterPresenter {
  @ApiProperty({ description: 'ID' })
  id: string;

  @ApiProperty({ description: 'Name' })
  name: string;

  @ApiProperty({ description: 'Brazilian Tax ID' })
  cpf: string;

  @ApiProperty({ description: 'Email' })
  email: string;

  @ApiProperty({ description: 'Adopter contacts' })
  contacts: AdopterContactPresenter[];

  @ApiProperty({ description: 'Adopter addresses' })
  addresses: AdopterAddressPresenter[];

  @ApiProperty({ description: 'Notification active' })
  activeNotification: boolean;

  @ApiProperty({ description: 'Date to notify' })
  dtToNotify?: Date;

  @ApiProperty({ description: 'Animals' })
  animals?: Partial<AnimalPresenter>[];

  @ApiProperty({ description: 'Auditable' })
  audit?: Audit;
}

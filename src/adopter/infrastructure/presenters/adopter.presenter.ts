import { AdopterAddressPresenter } from '@/adopter-address/infrastructure/presenters/adopter-address.presenter';
import { AdopterContactPresenter } from '@/adopter-contact/infrastructure/presenters/adopter-contact.presenter';
import { AnimalPresenter } from '@/animals/infrastructure/presenters/animal.presenter';
import type { Audit } from '@/shared/domain/entity';
import { TermPresenter } from '@/terms/infrastructure/presenters/term.presenter';
import { ApiProperty } from '@nestjs/swagger';

type MaritalStatusUnion =
  | 'solteiro'
  | 'casado'
  | 'divorciado'
  | 'viuvo'
  | 'separado'
  | 'uniao_estavel';

export class AdopterPresenter {
  @ApiProperty({ description: 'ID' })
  id: string;

  @ApiProperty({ description: 'Name' })
  name: string;

  @ApiProperty({ description: 'Date of birth' })
  dtOfBirth: Date;

  @ApiProperty({ description: 'Register' })
  rg: string;

  @ApiProperty({ description: 'Brazilian Tax ID' })
  cpf: string;

  @ApiProperty({ description: 'Email' })
  email: string;

  @ApiProperty({ description: 'Adopter contacts' })
  contacts: AdopterContactPresenter[];

  @ApiProperty({ description: 'Adopter profession' })
  profession: string;

  @ApiProperty({ description: 'Marital status' })
  civilState: MaritalStatusUnion;

  @ApiProperty({ description: 'Adopter addresses' })
  addresses: AdopterAddressPresenter[];

  @ApiProperty({ description: 'Notification active' })
  activeNotification: boolean;

  @ApiProperty({ description: 'Date to notify' })
  dtToNotify?: Date;

  @ApiProperty({ description: 'Animals' })
  animals?: AnimalPresenter[];

  @ApiProperty({ description: 'Terms' })
  terms?: TermPresenter[];

  @ApiProperty({ description: 'Auditable' })
  audit?: Audit;
}

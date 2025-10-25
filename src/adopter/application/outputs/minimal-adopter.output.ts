import {
  AdopterAddressOutput,
  AdopterAddressOutputMapper,
} from '@/adopter-address/application/outputs/adopter-address.output';
import {
  AdopterContactOutput,
  AdopterContactOutputMapper,
} from '@/adopter-contact/application/outputs/adopter-contact.output';
import { Adopter } from '@/adopter/domain/adopter.entity';
import {
  AnimalOutput,
  AnimalOutputMapper,
} from '@/animals/application/outputs/animal.output';
import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { Audit } from '@/shared/domain/entity';
import { Injectable } from '@nestjs/common';

export type MinimalAdopterOutput = {
  id: string;
  name: string;
  cpf: string;
  email: string;
  addresses: AdopterAddressOutput[];
  contacts: AdopterContactOutput[];
  activeNotification: boolean;
  dtToNotify?: Date;
  animals?: (Partial<AnimalOutput> & Pick<AnimalOutput, 'name'>)[];
  audit: Audit;
};
@Injectable()
export class MinimalAdopterOutputMapper extends OutputMapper<
  Adopter,
  MinimalAdopterOutput
> {
  constructor(
    private readonly addressMapper: AdopterAddressOutputMapper,
    private readonly animalMapper: AnimalOutputMapper,
    private readonly contactMapper: AdopterContactOutputMapper,
  ) {
    super();
  }

  toOutput(entity: Adopter): MinimalAdopterOutput {
    return {
      id: entity.id,
      name: entity.props.name,
      cpf: entity.props.cpf,
      email: entity.props.email,
      contacts: this.toOutputArray(entity.props.contacts, this.contactMapper),
      activeNotification: entity.props.activeNotification,
      dtToNotify: entity.props.dtToNotify,
      addresses: this.toOutputArray(entity.props.addresses, this.addressMapper),
      animals: this.toOutputArray(entity.props.animals, this.animalMapper),
      audit: entity.props.audit,
    };
  }
}

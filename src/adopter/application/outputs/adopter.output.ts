import {
  AdopterAddressOutput,
  AdopterAddressOutputMapper,
} from '@/adopter-address/application/outputs/adopter-address.output';
import {
  AdopterContactOutput,
  AdopterContactOutputMapper,
} from '@/adopter-contact/application/outputs/adopter-contact.output';
import { Adopter, MaritalStatusUnion } from '@/adopter/domain/adopter.entity';
import {
  AnimalOutput,
  AnimalOutputMapper,
} from '@/animals/application/outputs/animal.output';
import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import {
  TermOutput,
  TermOutputMapper,
} from '@/terms/application/outputs/term.output';
import { Injectable } from '@nestjs/common';

export type AdopterOutput = {
  id: string;
  name: string;
  dtOfBirth: Date;
  rg: string;
  cpf: string;
  email: string;
  contacts: AdopterContactOutput[];
  profession: string;
  civilState: MaritalStatusUnion;
  addresses: AdopterAddressOutput[];
  activeNotification: boolean;
  dtToNotify?: Date;
  animals?: AnimalOutput[];
  terms?: TermOutput[];
};
@Injectable()
export class AdopterOutputMapper extends OutputMapper<Adopter, AdopterOutput> {
  constructor(
    private readonly contactMapper: AdopterContactOutputMapper,
    private readonly addressMapper: AdopterAddressOutputMapper,
    private readonly animalMapper: AnimalOutputMapper,
    private readonly termMapper: TermOutputMapper,
  ) {
    super();
  }

  toOutput(entity: Adopter): AdopterOutput {
    return {
      id: entity.id,
      name: entity.props.name,
      dtOfBirth: entity.props.dtOfBirth,
      rg: entity.props.rg,
      cpf: entity.props.cpf,
      email: entity.props.email,
      profession: entity.props.profession,
      civilState: entity.props.civilState,
      activeNotification: entity.props.activeNotification,
      dtToNotify: entity.props.dtToNotify,
      contacts: this.toOutputArray(entity.props.contacts, this.contactMapper),
      addresses: this.toOutputArray(entity.props.addresses, this.addressMapper),
      animals: this.toOutputArray(entity.props.animals, this.animalMapper),
      terms: this.toOutputArray(entity.props.terms, this.termMapper),
    };
  }
}

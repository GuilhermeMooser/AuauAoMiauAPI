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
  MinimalAnimalOutput,
  MinimalAnimalOutputMapper,
} from '@/animals/application/outputs/minimal-animal.output';
import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { Audit } from '@/shared/domain/entity';
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
  animals?: MinimalAnimalOutput[];
  terms?: TermOutput[];
  audit: Audit;
};
@Injectable()
export class AdopterOutputMapper extends OutputMapper<Adopter, AdopterOutput> {
  constructor(
    private readonly contactMapper: AdopterContactOutputMapper,
    private readonly addressMapper: AdopterAddressOutputMapper,
    private readonly animalMapper: MinimalAnimalOutputMapper,
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
      animals: entity.props?.animals
        ? this.toOutputArray(entity.props.animals, this.animalMapper)
        : null,
      terms:
        entity.props?.terms?.length > 0
          ? (entity.props.terms.map(term => {
              return {
                id: term.id,
              };
            }) as TermOutput[])
          : undefined,
      audit: entity.props.audit,
    };
  }
}

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
import { Injectable } from '@nestjs/common';

export type MinimalAdopterOutput = {
  id: string;
  name: string;
  cpf: string;
  profession: string;
  addresses: AdopterAddressOutput[];
  activeNotification: boolean;
  dtToNotify?: Date;
  animals?: AnimalOutput[];
};
@Injectable()
export class MinimalAdopterOutputMapper extends OutputMapper<
  Adopter,
  MinimalAdopterOutput
> {
  constructor(
    private readonly addressMapper: AdopterAddressOutputMapper,
    private readonly animalMapper: AnimalOutputMapper,
  ) {
    super();
  }

  toOutput(entity: Adopter): MinimalAdopterOutput {
    return {
      id: entity.id,
      name: entity.props.name,
      cpf: entity.props.cpf,
      profession: entity.props.profession,
      activeNotification: entity.props.activeNotification,
      dtToNotify: entity.props.dtToNotify,
      addresses: this.toOutputArray(entity.props.addresses, this.addressMapper),
      animals: this.toOutputArray(entity.props.animals, this.animalMapper),
    };
  }
}

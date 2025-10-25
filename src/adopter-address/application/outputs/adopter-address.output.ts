import { AdopterAddress } from '@/adopter-address/domain/adopter-address.entity';
import { CityOutput } from '@/city/application/outputs/city.output';
import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { Injectable } from '@nestjs/common';

export type AdopterAddressOutput = {
  id: string;
  street: string;
  number?: number;
  neighborhood?: string;
  city: CityOutput;
};

@Injectable()
export class AdopterAddressOutputMapper extends OutputMapper<
  AdopterAddress,
  AdopterAddressOutput
> {
  toOutput(entity: AdopterAddress): AdopterAddressOutput {
    return {
      id: entity.props.id,
      street: entity.props.street,
      number: entity.props.number,
      neighborhood: entity.props.neighborhood,
      city: {
        id: entity.props.city.id,
        name: entity.props.city.name,
        stateUf: {
          id: entity.props.city.stateUf.id,
          name: entity.props.city.stateUf.name,
          acronym: entity.props.city.stateUf.acronym,
        },
      },
    };
  }
}

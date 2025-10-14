import { AdopterAddress } from '@/adopter-address/domain/adopter-address.entity';
import { CityOutput } from '@/city/application/outputs/city.output';
import { OutputMapper } from '@/shared/application/outputs/output-mapper';

export type AdopterAddressOutput = {
  id: string;
  street: string;
  number?: number;
  neighborhood?: string;
  city: CityOutput;
};
export class AdopterAddressOutputMapper extends OutputMapper<
  AdopterAddress,
  AdopterAddressOutput
> {}

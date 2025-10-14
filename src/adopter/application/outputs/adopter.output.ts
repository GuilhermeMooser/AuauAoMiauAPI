import { AdopterAddressOutput } from '@/adopter-address/application/outputs/adopter-address.output';
import { AdopterContactOutput } from '@/adopter-contact/application/outputs/adopter-contact.output';
import { Adopter, MaritalStatusUnion } from '@/adopter/domain/adopter.entity';
import { AnimalOutput } from '@/animals/application/outputs/animal.output';
import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { TermOutput } from '@/terms/application/outputs/term.output';

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
export class AdopterOutputMapper extends OutputMapper<Adopter, AdopterOutput> {}

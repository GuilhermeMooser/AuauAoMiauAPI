import { AdopterAddressDto } from '@/adopter-address/infrastructure/dto/adopter-address.dto';
import { AdopterContactDto } from '@/adopter-contacts/infrastructure/dto/adopter-contact.dto';
import { MaritalStatusUnion } from '@/adopter/domain/adopter.entity';
import { AnimalDto } from '@/animals/infrastructure/dto/animal.dto';
import { TermDto } from '@/terms/infrastructure/dto/term.dto';

export class CreateAdopterDto {
  name: string;
  dtOfBirth: Date;
  rg: string;
  cpf: string;
  email: string;
  contacts: AdopterContactDto[];
  profession: string;
  civilState: MaritalStatusUnion;
  addresses: AdopterAddressDto[];
  activeNotification: boolean;
  dtToNotify?: Date;
  animals?: AnimalDto[];
  terms?: TermDto[];
}

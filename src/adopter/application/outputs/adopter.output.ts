import { Adopter, MaritalStatusUnion } from "@/adopter/domain/adopter.entity";
import { OutputMapper } from "@/shared/application/outputs/output-mapper";

export type AdopterOutput = {
  id: string;
  name: string;
    dtOfBirth: Date;
    rg: string;
    cpf: string;
    email: string;
    // contacts: AdopterContactOutput[];
    profession: string;
    civilState: MaritalStatusUnion;
    // addresses: AdopterAddressOutput[];
    activeNotification: boolean;
    dtToNotify?: Date;
    // animals?: AnimalOutput[];
    // terms?: TermOutput[];
}
export class AdopterOutputMapper extends OutputMapper<Adopter, AdopterOutput> {}
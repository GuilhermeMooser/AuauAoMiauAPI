import { AdopterContact } from "@/adopter-contact/domain/adopter-contact.entity";
import { OutputMapper } from "@/shared/application/outputs/output-mapper";

type TypeOfContact = 'celular' | 'telefone' | 'whatsapp';

export type AdopterContactOutput = {
  id: number;
  value: string;
  isPrincipal: boolean;
  type: TypeOfContact;
}
export class AdopterContactOutputMapper extends OutputMapper<AdopterContact, AdopterContactOutput> {}
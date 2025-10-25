import { AdopterContact } from "@/adopter-contact/domain/adopter-contact.entity";
import { OutputMapper } from "@/shared/application/outputs/output-mapper";
import { Injectable } from "@nestjs/common";

type TypeOfContact = 'celular' | 'telefone' | 'whatsapp';

export type AdopterContactOutput = {
  id: string;
  value: string;
  isPrincipal: boolean;
  type: TypeOfContact;
}

@Injectable()
export class AdopterContactOutputMapper extends OutputMapper<AdopterContact, AdopterContactOutput> {
  toOutput(entity: AdopterContact): AdopterContactOutput {
    return {
      id: entity.props.id,
      value: entity.props.value,
      isPrincipal: entity.props.isPrincipal,
      type: entity.props.type,
    }
  }
}
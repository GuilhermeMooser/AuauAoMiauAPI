import { AuditableEntity } from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';

export type TypeOfContact = 'celular' | 'telefone' | 'whatsapp';

type AdopterContactProps = {
  value: string;
  isPrincipal: boolean;
  type: TypeOfContact;
};

export class AdopterContact extends AuditableEntity<AdopterContactProps> {
  constructor(
    props: AdopterContactProps & {
      id?: string;
      audit?: Partial<Audit>;
    },
  ) {
    super(props);
  }
}

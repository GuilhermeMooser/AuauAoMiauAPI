import { AuditableEntity } from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';

type AdopterContactProps = {
  name: string;
  phone: string;
  isPrincipal: boolean;
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

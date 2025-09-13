import { City } from '@/city/domain/city.entity';
import { AuditableEntity } from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';
import { StateUF } from '@/state-uf/domain/state-uf.entity';

type AdopterAdressProps = {
  street: string;
  number: number;
  neighborhood: string;
  city: City;
  state: StateUF;
};

export class AdopterAddress extends AuditableEntity<AdopterAdressProps> {
  constructor(
    props: AdopterAdressProps & {
      id?: string;
      audit?: Partial<Audit>;
    },
  ) {
    super(props);
  }
}

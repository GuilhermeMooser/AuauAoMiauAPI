import { City } from '@/city/domain/city.entity';
import { AuditableEntity } from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';

type AdopterAddressProps = {
  street: string;
  number?: number;
  neighborhood?: string;
  city: City;
};

export class AdopterAddress extends AuditableEntity<AdopterAddressProps> {
  constructor(
    props: AdopterAddressProps & {
      id?: string;
      audit?: Partial<Audit>;
    },
  ) {
    super(props);
  }
}

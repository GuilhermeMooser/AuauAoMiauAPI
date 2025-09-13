import { AdopterAddress } from '@/adopter-address/domain/adopter-adress.entity';
import { AdopterContact } from '@/adopter-contacts/domain/adopter-contact.entity';
import { Animal } from '@/animals/domain/animal.entity';
import { UserAuditableEntity } from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';
import { Term } from '@/terms/domain/term.entity';

type MaritalStatusUnion =
  | 'solteiro'
  | 'casado'
  | 'divorciado'
  | 'viúvo'
  | 'separado'
  | 'união_estável';

type AdopterProps = {
  name: string;
  dtOfBirth: Date;
  rg: string;
  cpf: string;
  email: string;
  contact: AdopterContact[];
  profession: string;
  civilState: MaritalStatusUnion;
  address: AdopterAddress[];
  activeNotification: boolean;
  dtToNotify: Date;
  animals?: Animal[];
  terms?: Term[];
};

export class Adopter extends UserAuditableEntity<AdopterProps> {
  constructor(
    props: AdopterProps & {
      id?: string;
      audit?: Partial<Audit>;
      createdByUserId?: string;
      updatedByUserId?: string;
      deletedByUserId?: string;
    },
  ) {
    super(props);
  }

  get name() {
    return this.props.name;
  }

  get dtOfBirth() {
    return this.props.dtOfBirth;
  }

  get rg() {
    return this.props.rg;
  }

  get cpf() {
    return this.props.cpf;
  }

  get contact() {
    return this.props.contact;
  }
  get profession() {
    return this.props.profession;
  }
  get civilState() {
    return this.props.civilState;
  }

  get address() {
    return this.props.address;
  }

  get activeNotification() {
    return this.props.activeNotification;
  }

  get dtToNotify() {
    return this.props.dtToNotify;
  }

  get animals() {
    return this.props.animals;
  }

  get terms() {
    return this.props.terms;
  }

  static create(
    props: AdopterProps & {
      createdByUserId?: string;
    },
  ): Adopter {
    return new Adopter({
      ...props,
      createdByUserId: props.createdByUserId,
      audit: {
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    });
  }
}

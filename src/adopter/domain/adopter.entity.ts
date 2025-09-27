import { AdopterAddress } from '@/adopter-address/domain/adopter-address.entity';
import { AdopterContact } from '@/adopter-contact/domain/adopter-contact.entity';
import { Animal } from '@/animals/domain/animal.entity';
import { UserAuditableEntity } from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';
import { Term } from '@/terms/domain/term.entity';

export type MaritalStatusUnion =
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
  cpf: string; //UNIQUE
  email: string; //UNIQUE
  contacts: AdopterContact[];
  profession: string;
  civilState: MaritalStatusUnion;
  addresses: AdopterAddress[];
  activeNotification: boolean;
  dtToNotify?: Date; //Controlled by activeNotification
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

  get contacts() {
    return this.props.contacts;
  }
  get profession() {
    return this.props.profession;
  }
  get civilState() {
    return this.props.civilState;
  }

  get addresses() {
    return this.props.addresses;
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

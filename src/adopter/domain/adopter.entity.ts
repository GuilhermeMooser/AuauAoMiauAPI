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
  | 'viuvo'
  | 'separado'
  | 'uniao_estavel';

type AdopterProps = {
  name: string;
  dtOfBirth: Date;
  rg: string;
  cpf: string;
  email: string;
  contacts: AdopterContact[];
  profession: string;
  civilState: MaritalStatusUnion;
  addresses: AdopterAddress[];
  activeNotification: boolean;
  dtToNotify?: Date;
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

  get email() {
    return this.props.email;
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

  update(
    props: Partial<AdopterProps> & {
      updatedByUserId?: string;
    },
  ): void {
    if (props.name !== undefined) {
      this.props.name = props.name;
    }
    if (props.dtOfBirth !== undefined) {
      this.props.dtOfBirth = props.dtOfBirth;
    }
    if (props.rg !== undefined) {
      this.props.rg = props.rg;
    }
    if (props.cpf !== undefined) {
      this.props.cpf = props.cpf;
    }
    if (props.email !== undefined) {
      this.props.email = props.email;
    }
    if (props.contacts !== undefined) {
      this.props.contacts = props.contacts;
    }
    if (props.profession !== undefined) {
      this.props.profession = props.profession;
    }
    if (props.civilState !== undefined) {
      this.props.civilState = props.civilState;
    }
    if (props.addresses !== undefined) {
      this.props.addresses = props.addresses;
    }
    if (props.activeNotification !== undefined) {
      this.props.activeNotification = props.activeNotification;
    }
    if (props.dtToNotify !== undefined) {
      this.props.dtToNotify = props.dtToNotify;
    }

    /**In case there is no animal, set it to undefined */
    this.props.animals = props.animals;

    if (props.terms !== undefined) {
      this.props.terms = props.terms;
    }

    if (props.updatedByUserId) {
      this.props.updatedByUserId = props.updatedByUserId;
    }

    if (this.audit) {
      this.audit.updatedAt = new Date();
    }
  }
}

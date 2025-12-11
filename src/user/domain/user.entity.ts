import { UserAuditableEntity } from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';
import { UserRole } from '@/user-role/domain/user-role.entity';

type UserProps = {
  name: string;
  password: string;
  email: string;
  active: boolean;
  cpf: string;
  role: UserRole;
};

export class User extends UserAuditableEntity<UserProps> {
  constructor(
    props: UserProps & {
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

  get password() {
    return this.props.password;
  }

  get email() {
    return this.props.email;
  }

  get active() {
    return this.props.active;
  }

  get cpf() {
    return this.props.cpf;
  }

  get role() {
    return this.props.role;
  }

  static create(
    props: UserProps & {
      createdByUserId?: string;
    },
  ): User {
    return new User({
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
    props: Partial<UserProps> & {
      updatedByUserId?: string;
    },
  ) {
    if (props.name !== undefined) {
      this.props.name = props.name;
    }
    if (props.password !== undefined) {
      this.props.password = props.password;
    }
    if (props.cpf !== undefined) {
      this.props.cpf = props.cpf;
    }
    if (props.email !== undefined) {
      this.props.email = props.email;
    }
    if (props.role !== undefined) {
      this.props.role = props.role;
    }
    if (props.active !== undefined) {
      this.props.active = props.active;
    }
  }
}

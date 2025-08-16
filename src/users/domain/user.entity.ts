import {
  UserAuditable,
  UserAuditableProps,
} from '@/shared/domain/auditable.entity';

type UserProps = UserAuditableProps & {
  id?: number;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  // role: UserRoles;
};

export class User extends UserAuditable {
  readonly id?: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly isActive: boolean;
  // readonly role: UserRoles;

  constructor(props: UserProps) {
    super(props);
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.isActive = props.isActive;
    // this.role = props.role;
  }
}

import {
  UserAuditable,
  UserAuditableProps,
} from '@/shared/domain/auditable.entity';

type UsersProps = UserAuditableProps & {
  id?: number;
  name: string;
  email: string;
  password: string;
  // role: UserRoles;
};

export class Users extends UserAuditable {
  readonly id?: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  // readonly role: UserRoles;

  constructor(props: UsersProps) {
    super(props);
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    // this.role = props.role;
  }
}

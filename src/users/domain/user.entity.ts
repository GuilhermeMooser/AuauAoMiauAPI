import { Role } from '@/VER AINDA/roles/domain/role.entity';
import { UserAuditableEntity } from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';
import { UserSessions } from '@/userSessions/domain/user-session.entity';

type UserProps = {
  name: string;
  email: string;
  password: string;
  active: boolean;
  refreshToken?: string;
  lastLoginAt?: Date;
  lastLoginIp?: string;
  roles: Role[];
  sessions?: UserSessions[];
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

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get active() {
    return this.props.active;
  }

  get refreshToken() {
    return this.props.refreshToken;
  }

  get lastLoginAt() {
    return this.props.lastLoginAt;
  }

  get lastLoginIp() {
    return this.props.lastLoginIp;
  }

  get roles() {
    return this.props.roles || [];
  }

  get sessions() {
    return this.props.sessions || [];
  }

  hasRole(roleName: string): boolean {
    return this.roles.some(role => role.name === roleName);
  }

  hasAnyRole(roleNames: string[]): boolean {
    return this.roles.some(role => roleNames.includes(role.name));
  }

  isActive(): boolean {
    return this.props.active && !this.isDeleted();
  }

  static create(
    props: UserProps & {
      createdByUserId?: string;
    },
  ): User {
    return new User({
      ...props,
      roles: props.roles || [],
      createdByUserId: props.createdByUserId,
      audit: {
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    });
  }
}

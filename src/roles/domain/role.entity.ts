import { Permission } from '@/permission/domain/permission.entity';
import { AuditableEntity } from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';
import { User } from '@/users/domain/user.entity';

type RoleProps = {
  name: string;
  displayName: string;
  description?: string;
  users?: User[];
  permissions?: Permission[];
};

export class Role extends AuditableEntity<RoleProps> {
  constructor(
    props: RoleProps & {
      id?: string;
      audit?: Partial<Audit>;
    },
  ) {
    super(props);
  }
  get name() {
    return this.props.name;
  }
  get displayName() {
    return this.props.displayName;
  }
  get description() {
    return this.props.description;
  }
  get users() {
    return this.props.users;
  }
  get permissions() {
    return this.props.permissions;
  }
  static create(props: RoleProps): Role {
    return new Role({
      ...props,
      audit: {
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    });
  }
}

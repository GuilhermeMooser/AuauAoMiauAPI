import { Users } from '@/users/domain/user.entity';

export type AuditableProps = {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export abstract class Auditable {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(props: AuditableProps) {
    this.createdAt = props?.createdAt;
    this.updatedAt = props?.updatedAt;
    this.deletedAt = props?.deletedAt;
  }
}

export type UserAuditableProps = AuditableProps & {
  createdBy?: Users;
  updatedBy?: Users;
  deletedBy?: Users;
};

export abstract class UserAuditable extends Auditable {
  readonly createdBy?: Users;
  readonly updatedBy?: Users;
  readonly deletedBy?: Users;

  constructor(props: UserAuditableProps) {
    super(props);
    this.createdBy = props?.createdBy;
    this.updatedBy = props?.updatedBy;
    this.deletedBy = props?.deletedBy;
  }
}

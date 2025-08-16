import { User } from '@/users/domain/user.entity';

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
  createdBy?: User;
  updatedBy?: User;
  deletedBy?: User;
};

export abstract class UserAuditable extends Auditable {
  readonly createdBy?: User;
  readonly updatedBy?: User;
  readonly deletedBy?: User;

  constructor(props: UserAuditableProps) {
    super(props);
    this.createdBy = props?.createdBy;
    this.updatedBy = props?.updatedBy;
    this.deletedBy = props?.deletedBy;
  }
}

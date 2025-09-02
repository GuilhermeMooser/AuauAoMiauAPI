import { Audit, BaseProps, Entity } from './entity';

export abstract class AuditableEntity<
  Props extends BaseProps,
> extends Entity<Props> {
  constructor(
    props: Props & {
      id?: string;
      audit?: Partial<Audit>;
    },
  ) {
    super(props);
  }

  get createdAt() {
    return this.props.audit.createdAt;
  }

  get updatedAt() {
    return this.props.audit.updatedAt;
  }

  get deletedAt() {
    return this.props.audit.deletedAt;
  }

  isDeleted(): boolean {
    return this.props.audit.deletedAt !== null;
  }
}

export type UserAuditableProps = {
  createdByUserId?: string;
  updatedByUserId?: string;
  deletedByUserId?: string;
};

export abstract class UserAuditableEntity<
  Props extends BaseProps,
> extends AuditableEntity<Props & UserAuditableProps> {
  constructor(
    props: Props &
      UserAuditableProps & {
        id?: string;
        audit?: Partial<Audit>;
      },
  ) {
    super(props);
  }

  get createdByUserId() {
    return this.props.createdByUserId;
  }

  get updatedByUserId() {
    return this.props.updatedByUserId;
  }

  get deletedByUserId() {
    return this.props.deletedByUserId;
  }

  isCreatedBy(userId: string): boolean {
    return this.props.createdByUserId === userId;
  }

  isUpdatedBy(userId: string): boolean {
    return this.props.updatedByUserId === userId;
  }

  isDeletedBy(userId: string): boolean {
    return this.props.deletedByUserId === userId;
  }
}

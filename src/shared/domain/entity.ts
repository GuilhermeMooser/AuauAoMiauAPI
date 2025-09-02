export type BaseProps = Record<string, unknown>;

export type Audit = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type EntityProps = {
  id: string;
  audit: Audit;
};

type ConstructorEntityProps = {
  id?: string;
  audit?: Partial<Audit>;
};

export abstract class Entity<Props extends BaseProps> {
  props: Props & EntityProps;

  constructor(props: Props & ConstructorEntityProps) {
    this.props = {
      ...props,
      id: props.id ?? crypto.randomUUID().toString(),
      audit: {
        createdAt: props.audit?.createdAt ?? new Date(),
        updatedAt: props.audit?.updatedAt ?? new Date(),
        deletedAt: props.audit?.deletedAt ?? null,
      },
    };
  }

  get id() {
    return this.props.id;
  }

  get audit() {
    return this.props.audit;
  }

  toJSON(): Props & EntityProps {
    return {
      ...this.props,
    };
  }
}

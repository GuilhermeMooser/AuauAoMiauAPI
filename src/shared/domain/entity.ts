/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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
    return this.convertToPlainObject(this.props) as Props & EntityProps;
  }

  private convertToPlainObject(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    // Se é uma entidade, chama o toJSON dela
    if (obj instanceof Entity) {
      return obj.toJSON();
    }

    // Se é um array, processa cada item
    if (Array.isArray(obj)) {
      return obj.map(item => this.convertToPlainObject(item));
    }

    // Se é um objeto simples, processa suas propriedades
    if (typeof obj === 'object' && obj.constructor === Object) {
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = this.convertToPlainObject(value);
      }
      return result;
    }

    // Para tipos primitivos, retorna como está
    return obj;
  }
}

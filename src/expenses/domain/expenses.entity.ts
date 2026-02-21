import { Animal } from '@/animals/domain/animal.entity';
import {
  AuditableEntity,
  UserAuditableEntity,
} from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';

type ExpensesProps = {
  expenseType: string;
  value: number;
  description: string;
  paymentType: string;
  animal: Animal;
  // expenseAttachment?: ExpenseAttachment
};

export class Expenses extends UserAuditableEntity<ExpensesProps> {
  constructor(
    props: ExpensesProps & {
      id?: string;
      audit?: Partial<Audit>;
      createdByUserId?: string;
      updatedByUserId?: string;
      deletedByUserId?: string;
    },
  ) {
    super(props);
  }

  static create(
    props: ExpensesProps & {
      createdByUserId?: string;
    },
  ): Expenses {
    return new Expenses({
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
    props: Partial<ExpensesProps> & {
      updatedByUserId?: string;
    },
  ) {
    if (props.expenseType !== undefined) {
      this.props.expenseType = props.expenseType;
    }
    if (props.value !== undefined) {
      this.props.value = props.value;
    }
    if (props.description !== undefined) {
      this.props.description = props.description;
    }
    if (props.paymentType !== undefined) {
      this.props.paymentType = props.paymentType;
    }
    if (props.animal !== undefined) {
      this.props.animal = props.animal;
    }
  }
}

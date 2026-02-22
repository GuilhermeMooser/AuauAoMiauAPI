import { Animal } from '@/animals/domain/animal.entity';
import { AnimalProcedures } from '@/procedures/animal-procedures/domain/animal-procedures.entity';
import {
  AuditableEntity,
  UserAuditableEntity,
} from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';

type ExpensesProps = {
  expenseType: string;
  value: number;
  description: string;
  paymentType?: string;
  animal?: Animal;
  animalProcedure?: AnimalProcedures;
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

  get animalProcedure() {
    return this.props.animalProcedure;
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
    if (props.animalProcedure !== undefined) {
      this.props.animalProcedure = props.animalProcedure;
    }
    if (props.updatedByUserId) {
      this.props.updatedByUserId = props.updatedByUserId;
    }
    // if (props.animal !== undefined) {
    //   this.props.animal = props.animal;
    // }
  }
}

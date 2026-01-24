import { Animal } from '@/animals/domain/animal.entity';
import { AuditableEntity } from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';

type ExpensesProps = {
  expenseType: string;
  value: number;
  description: string;
  paymentType: string;
  animal: Animal;
  // expenseAttachment?: ExpenseAttachment
};

export class Expenses extends AuditableEntity<ExpensesProps> {
  constructor(
    props: ExpensesProps & {
      id?: string;
      audit?: Partial<Audit>;
    },
  ) {
    super(props);
  }

  static create(props: ExpensesProps): Expenses {
    return new Expenses({
      ...props,
      audit: {
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    });
  }
}

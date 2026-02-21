import { Expenses } from '@/expenses/domain/expenses.entity';
import { ExpensesSchema } from '../expenses.schema';
import { RepositoryBaseMapper } from '@/shared/domain/repositories/repository-base-mapper';

export class ExpenseMapper extends RepositoryBaseMapper<
  ExpensesSchema,
  Expenses
> {
  private static _instance: ExpenseMapper;

  static get instance(): ExpenseMapper {
    if (!this._instance) {
      this._instance = new ExpenseMapper();
    }
    return this._instance;
  }

  toEntity(schema: ExpensesSchema): Expenses {
    if (!schema) return null;

    return new Expenses({
      id: schema.id,
      description: schema.description,
      expenseType: schema.expenseType,
      paymentType: schema?.paymentType,
      value: schema.value,
      audit: {
        createdAt: schema.createdAt,
        deletedAt: schema.deletedAt,
        updatedAt: schema.updatedAt,
      },
      createdByUserId: schema.createdByUserId,
      deletedByUserId: schema.deletedByUserId,
      updatedByUserId: schema.updatedByUserId,
      // expensesAttachment
    });
  }
}

import { Expenses } from '@/expenses/domain/expenses.entity';
import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { Injectable } from '@nestjs/common';

export type MinimalExpensesOutput = {
  id: string;
  expenseType: string;
  value: number;
  description: string;
  paymentType: string;
};

@Injectable()
export class MinimalExpensesOutputMapper extends OutputMapper<
  Expenses,
  MinimalExpensesOutput
> {
  toOutput(entity: Expenses): MinimalExpensesOutput {
    return {
      id: entity.id,
      expenseType: entity.props.expenseType,
      value: entity.props.value,
      description: entity.props.description,
      paymentType: entity.props.paymentType,
    };
  }
}

import type { Audit } from '@/shared/domain/entity';
import { ApiProperty } from '@nestjs/swagger';

export class MinimalExpensePresenter {
  @ApiProperty({ description: 'ID' })
  id: string;

  @ApiProperty({ description: 'Expense type' })
  expenseType: string;

  @ApiProperty({ description: 'Value of expense' })
  value: number;

  @ApiProperty({ description: 'Description of expense' })
  description: string;

  @ApiProperty({ description: 'Payment type of expense' })
  paymentType: string;

  @ApiProperty({ description: 'Auditable' })
  audit?: Audit;
}

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateExpenseDto } from './create-expenses.dto';

/**
 * Must be optional because the user can create a new expenses by the way
 */
export class UpdateExpenseDto extends CreateExpenseDto {
  @IsString()
  @IsOptional()
  id?: string;
}

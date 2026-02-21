import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { CreateExpenseDto } from './create-expenses.dto';

export class UpdateExpenseDto extends CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

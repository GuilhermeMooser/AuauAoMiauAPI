import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAnimalProceduresDto } from './create-animal-procedures.dto';
import { UpdateExpenseDto } from '@/expenses/infrastructure/dto/update-expenses.dto';

export class UpdateAnimalProceduresDto extends CreateAnimalProceduresDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateExpenseDto)
  declare expenses?: UpdateExpenseDto[];
}

import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAnimalDto } from './create-animal.dto';
import { UpdateAnimalProcedureDispatcherDto } from './update-animal-procedure-dispatcher.dto';
import { Type } from 'class-transformer';
import { UpdateExpenseDto } from '@/expenses/infrastructure/dto/update-expenses.dto';

export class UpdateAnimalDto extends CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateExpenseDto)
  declare expenses?: UpdateExpenseDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAnimalProcedureDispatcherDto)
  declare animalProcedures?: UpdateAnimalProcedureDispatcherDto[];
}

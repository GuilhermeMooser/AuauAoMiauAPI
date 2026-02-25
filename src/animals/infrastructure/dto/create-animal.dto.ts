import type { AnimalGender, AnimalSize } from '@/animals/domain/animal.entity';
import { CreateAnimalProceduresDto } from '@/procedures/animal-procedures/infrastructure/dto/create-animal-procedures.dto';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAnimalProcedureDispatcherDto } from './create-animal-procedure-dispatcher.dto';
import { CreateExpenseDto } from '@/expenses/infrastructure/dto/create-expenses.dto';

export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Type(() => Number)
  age: number;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dtOfBirth?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dtOfDeath?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dtOfRescue?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dtOfAdoption?: Date;

  @IsString()
  @IsOptional()
  locationOfRescue?: string;

  @IsString()
  @IsOptional()
  adopterId?: string;

  @IsInt()
  @IsNotEmpty()
  typeId: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['pequeno', 'médio', 'grande'])
  size: AnimalSize;

  @IsString()
  @IsNotEmpty()
  @IsIn(['M', 'F'])
  gender: AnimalGender;

  @IsString()
  @IsOptional()
  additionalInfo?: string;

  @IsBoolean()
  @IsOptional()
  castrated: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExpenseDto)
  expenses?: CreateExpenseDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnimalProcedureDispatcherDto)
  animalProcedures?: CreateAnimalProcedureDispatcherDto[];
}

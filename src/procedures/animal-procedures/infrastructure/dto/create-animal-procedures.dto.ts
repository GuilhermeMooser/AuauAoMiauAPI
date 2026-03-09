import { IsArray, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { AnimalProcedureEnum } from "../animal-procedures.schema";
import { Type } from "class-transformer";
import { CreateExpenseDto } from "@/expenses/infrastructure/dto/create-expenses.dto";

export class CreateAnimalProceduresDto {

  @IsNotEmpty()
  @IsEnum(AnimalProcedureEnum, {
    message: 'O tipo do procedimento precisa ser um valor válido.',
  })
  procedureType: AnimalProcedureEnum;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dtOfProcedure?: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  veterinarian?: string;

  @IsString()
  @IsOptional()
  observation?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExpenseDto)
  expenses?: CreateExpenseDto[];
}

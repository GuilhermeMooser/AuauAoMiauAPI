import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateMedicineProcedureDto {

  @IsString()
  @IsNotEmpty()
  medicineName: string;

  @IsString()
  @IsOptional()
  @MaxLength(400)
  reason: string;

  @IsString()
  @IsOptional()
  dosage?: string;

  @IsString()
  @IsOptional()
  frequency?: string;

  @IsDate()
  @Type(() => Date)
  dtOfStart: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dtOfEnd?: Date;
}
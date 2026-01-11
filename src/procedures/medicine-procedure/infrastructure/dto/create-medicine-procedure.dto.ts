import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateMedicineProcedureDto {

  @IsString()
  @IsNotEmpty()
  medicineName: string;

  @IsString()
  @IsNotEmpty()
  @Length(400)
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
  dtOfEnd: Date;
}
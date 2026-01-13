import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateSurgeryProcedureDto {

  @IsString()
  @IsNotEmpty()
  surgeryName: string;

  @IsString()
  @IsOptional()
  surgeryType: string;

  @IsString()
  @IsOptional()
  local: string;

  @IsString()
  @IsOptional()
  @MaxLength(400)
  reason: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dtOfDuration: Date;

  @IsString()
  @IsOptional()
  @MaxLength(400)
  recomendations: string;
}
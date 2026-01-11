import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateVaccineProcedureDto {

  @IsString()
  @IsNotEmpty()
  vaccineName: string;

  @IsString()
  @IsOptional()
  vaccineType?: string;

  @IsString()
  @IsOptional()
  batch: string;

  @IsString()
  @IsOptional()
  manufacturer: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dtOfExpiration: Date;
}
import { IsOptional, IsString } from 'class-validator';
import { CreateVaccineProcedureDto } from './create-vaccine-procedure.dto';

export class UpdateVaccineProcedureDto extends CreateVaccineProcedureDto {
  @IsOptional()
  @IsString()
  id?: string;
}

import { IsOptional, IsString } from 'class-validator';
import { CreateSurgeryProcedureDto } from './create-surgery-procedure.dto';

export class UpdateSurgeryProcedureDto extends CreateSurgeryProcedureDto {
  @IsOptional()
  @IsString()
  id?: string;
}

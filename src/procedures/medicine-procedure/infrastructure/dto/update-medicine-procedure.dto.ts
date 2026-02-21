import {  IsOptional, IsString } from 'class-validator';
import { CreateMedicineProcedureDto } from './create-medicine-procedure.dto';

export class UpdateMedicineProcedureDto extends CreateMedicineProcedureDto {
  @IsOptional()
  @IsString()
  id?: string;
}

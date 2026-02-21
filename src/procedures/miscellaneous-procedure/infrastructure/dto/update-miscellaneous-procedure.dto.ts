import { IsOptional, IsString } from 'class-validator';
import { CreateMiscellaneousProcedureDto } from './create-miscellaneous-procedure.dto';

export class UpdateMiscellaneousProcedureDto extends CreateMiscellaneousProcedureDto {
  @IsOptional()
  @IsString()
  id?: string;
}

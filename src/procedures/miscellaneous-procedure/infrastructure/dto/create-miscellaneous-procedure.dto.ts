import { IsOptional, IsString, MaxLength } from 'class-validator';
//TODO Remove
export class CreateMiscellaneousProcedureDto {
  @IsString()
  @IsOptional()
  @MaxLength(400)
  reason: string;

  @IsString()
  @IsOptional()
  @MaxLength(600)
  recomendations?: string;
}

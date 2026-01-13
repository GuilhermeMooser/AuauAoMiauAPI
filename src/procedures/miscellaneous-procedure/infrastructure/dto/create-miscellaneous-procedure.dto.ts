import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateMiscellaneousProcedureDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  reason: string;

  @IsString()
  @IsOptional()
  @MaxLength(600)
  recomendations?: string;
}
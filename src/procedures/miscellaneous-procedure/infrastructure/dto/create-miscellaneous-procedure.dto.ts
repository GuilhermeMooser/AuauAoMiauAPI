import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateMiscellaneousProcedureDto {

  @IsString()
  @IsNotEmpty()
  @Length(400)
  reason: string;

  @IsString()
  @IsOptional()
  @Length(600)
  recomendations?: string;
}
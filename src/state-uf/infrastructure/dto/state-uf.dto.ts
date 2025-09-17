import { IsInt, IsString } from "class-validator";

export class StateUfDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  acronym: string;

  @IsString()
  country: string;
}
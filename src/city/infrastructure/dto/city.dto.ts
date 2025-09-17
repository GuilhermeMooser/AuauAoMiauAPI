import { StateUfDto } from "@/state-uf/infrastructure/dto/state-uf.dto";
import { Type } from "class-transformer";
import { IsInt, IsString, ValidateNested } from "class-validator";

export class CityDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => StateUfDto)
  stateUf: StateUfDto;

  @IsInt()
  ibge: number;
}
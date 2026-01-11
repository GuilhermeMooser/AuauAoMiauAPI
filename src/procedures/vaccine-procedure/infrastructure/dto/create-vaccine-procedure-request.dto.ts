import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateVaccineProcedureDto } from "./create-vaccine-procedure.dto";
import { CreateAnimalProceduresDto } from "@/procedures/animal-procedures/infrastructure/dto/create-animal-procedures.dto";

export class CreateVaccineProcedureRequestDto extends CreateAnimalProceduresDto {

  @ValidateNested()
  @Type(() => CreateVaccineProcedureDto)
  payload: CreateVaccineProcedureDto;
}
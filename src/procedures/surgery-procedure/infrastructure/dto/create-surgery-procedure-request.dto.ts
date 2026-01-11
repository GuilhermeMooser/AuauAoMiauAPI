import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateSurgeryProcedureDto } from "./create-surgery-procedure.dto";
import { CreateAnimalProceduresDto } from "@/procedures/animal-procedures/infrastructure/dto/create-animal-procedures.dto";

export class CreateSurgeryProcedureRequestDto extends CreateAnimalProceduresDto {
  @ValidateNested()
  @Type(() => CreateSurgeryProcedureDto)
  payload: CreateSurgeryProcedureDto;
}
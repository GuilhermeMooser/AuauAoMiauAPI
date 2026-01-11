import { ValidateNested } from "class-validator";
import { CreateMiscellaneousProcedureDto } from "./create-miscellaneous-procedure.dto";
import { Type } from "class-transformer";
import { CreateAnimalProceduresDto } from "@/procedures/animal-procedures/infrastructure/dto/create-animal-procedures.dto";

export class CreateMiscellaneousProcedureRequestDto extends CreateAnimalProceduresDto {

  @ValidateNested()
  @Type(() => CreateMiscellaneousProcedureDto)
  payload: CreateMiscellaneousProcedureDto;
}
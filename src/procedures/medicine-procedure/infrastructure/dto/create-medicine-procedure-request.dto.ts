import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateMedicineProcedureDto } from "./create-medicine-procedure.dto";
import { CreateAnimalProceduresDto } from "@/procedures/animal-procedures/infrastructure/dto/create-animal-procedures.dto";

export class CreateMedicineProcedureRequestDto extends CreateAnimalProceduresDto {

  @ValidateNested()
  @Type(() => CreateMedicineProcedureDto)
  payload: CreateMedicineProcedureDto;
}
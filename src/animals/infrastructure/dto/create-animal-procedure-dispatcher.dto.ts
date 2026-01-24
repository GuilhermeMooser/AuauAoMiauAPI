import { AnimalProcedureEnum } from "@/procedures/animal-procedures/infrastructure/animal-procedures.schema";
import { CreateAnimalProceduresDto } from "@/procedures/animal-procedures/infrastructure/dto/create-animal-procedures.dto";
import { CreateMedicineProcedureDto } from "@/procedures/medicine-procedure/infrastructure/dto/create-medicine-procedure.dto";
import { CreateMiscellaneousProcedureDto } from "@/procedures/miscellaneous-procedure/infrastructure/dto/create-miscellaneous-procedure.dto";
import { CreateSurgeryProcedureDto } from "@/procedures/surgery-procedure/infrastructure/dto/create-surgery-procedure.dto";
import { CreateVaccineProcedureDto } from "@/procedures/vaccine-procedure/infrastructure/dto/create-vaccine-procedure.dto";
import { Type } from "class-transformer";
import { IsEnum, ValidateNested } from "class-validator";

export class CreateAnimalProcedureDispatcherDto extends CreateAnimalProceduresDto {

  @ValidateNested()
  @Type(({ object }) => {
    switch (object.procedureType) {
      case AnimalProcedureEnum.SURGERY:
        return CreateSurgeryProcedureDto;

      case AnimalProcedureEnum.VACCINE:
        return CreateVaccineProcedureDto;

      case AnimalProcedureEnum.MEDICINE:
        return CreateMedicineProcedureDto;

      case AnimalProcedureEnum.MISCELLANEOUS:
        return CreateMiscellaneousProcedureDto;

      default:
        return Object;
    }
  })
  payload:
    | CreateSurgeryProcedureDto
    | CreateVaccineProcedureDto
    | CreateMedicineProcedureDto
    | CreateMiscellaneousProcedureDto;
}


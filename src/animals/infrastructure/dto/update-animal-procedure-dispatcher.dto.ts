import { AnimalProcedureEnum } from '@/procedures/animal-procedures/infrastructure/animal-procedures.schema';
import { UpdateAnimalProceduresDto } from '@/procedures/animal-procedures/infrastructure/dto/update-animal-procedures.dto';
import { UpdateMedicineProcedureDto } from '@/procedures/medicine-procedure/infrastructure/dto/update-medicine-procedure.dto';
import { UpdateMiscellaneousProcedureDto } from '@/procedures/miscellaneous-procedure/infrastructure/dto/update-miscellaneous-procedure.dto';
import { UpdateSurgeryProcedureDto } from '@/procedures/surgery-procedure/infrastructure/dto/update-surgery-procedure.dto';
import { UpdateVaccineProcedureDto } from '@/procedures/vaccine-procedure/infrastructure/dto/update-vaccine-procedure.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class UpdateAnimalProcedureDispatcherDto extends UpdateAnimalProceduresDto {
  @ValidateNested()
  @Type(({ object }) => {
    switch (object.procedureType) {
      case AnimalProcedureEnum.SURGERY:
        return UpdateSurgeryProcedureDto;

      case AnimalProcedureEnum.VACCINE:
        return UpdateVaccineProcedureDto;

      case AnimalProcedureEnum.MEDICINE:
        return UpdateMedicineProcedureDto;

      case AnimalProcedureEnum.MISCELLANEOUS:
        return UpdateMiscellaneousProcedureDto;

      default:
        return Object;
    }
  })
  payload:
    | UpdateSurgeryProcedureDto
    | UpdateVaccineProcedureDto
    | UpdateMedicineProcedureDto
    | UpdateMiscellaneousProcedureDto;
}

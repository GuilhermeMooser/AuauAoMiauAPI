import { Expenses } from '@/expenses/domain/expenses.entity';
import { AnimalProcedureEnum } from '../animal-procedures.schema';
import { CreateMedicineProcedureDto } from '@/procedures/medicine-procedure/infrastructure/dto/create-medicine-procedure.dto';
import { CreateSurgeryProcedureDto } from '@/procedures/surgery-procedure/infrastructure/dto/create-surgery-procedure.dto';
import { CreateVaccineProcedureDto } from '@/procedures/vaccine-procedure/infrastructure/dto/create-vaccine-procedure.dto';
import { CreateMiscellaneousProcedureDto } from '@/procedures/miscellaneous-procedure/infrastructure/dto/create-miscellaneous-procedure.dto';
import { Animal } from '@/animals/domain/animal.entity';
import {
  AnimalProcedures,
  AnimalProceduresProps,
} from '../../domain/animal-procedures.entity';
import { ProcedureDto } from '../../application/create-animal-procedure.usecase';
import { User } from '@/user/domain/user.entity';
import { ConflictError } from '@/shared/application/errors/conflict-error';
import { UpdateProcedureDto } from '../../application/update-animal-procedure.usecase';

export class AnimalProcedureFactory {
  static create(
    dto: ProcedureDto,
    animal: Animal,
    loggedUser: User,
  ): AnimalProcedures {
    const expensesEntities: Expenses[] | undefined = dto.expenses?.map(exp =>
      Expenses.create({
        animal: animal,
        description: exp.description,
        expenseType: exp.expenseType,
        paymentType: exp.paymentType,
        value: exp.value,
        // expenseAttachment: exp.expenseAttachment,
        createdByUserId: loggedUser.id,
      }),
    );

    const base: AnimalProceduresProps = {
      animal: animal,
      procedureType: dto.procedureType,
      dtOfProcedure: dto.dtOfProcedure,
      description: dto.description,
      veterinarian: dto.veterinarian,
      observation: dto.observation,
      expenses: expensesEntities,
    };

    switch (dto.procedureType) {
      case AnimalProcedureEnum.MEDICINE:
        return AnimalProcedures.create({
          ...base,
          ...(dto.payload as CreateMedicineProcedureDto),
          createdByUserId: loggedUser.id,
        });

      case AnimalProcedureEnum.SURGERY:
        return AnimalProcedures.create({
          ...base,
          ...(dto.payload as CreateSurgeryProcedureDto),
          createdByUserId: loggedUser.id,
        });

      case AnimalProcedureEnum.VACCINE:
        return AnimalProcedures.create({
          ...base,
          ...(dto.payload as CreateVaccineProcedureDto),
          createdByUserId: loggedUser.id,
        });

      case AnimalProcedureEnum.MISCELLANEOUS:
        return AnimalProcedures.create({
          ...base,
          ...(dto.payload as CreateMiscellaneousProcedureDto),
          createdByUserId: loggedUser.id,
        });

      default:
        throw new ConflictError('Tipo procedimento inválido.');
    }
  }

  static update(
    dto: UpdateProcedureDto,
    animal: Animal,
    loggedUser: User,
    existingProcedure: AnimalProcedures,
    expensesEntities: Expenses[],
  ): AnimalProcedures {
    const base: Partial<AnimalProceduresProps> = {
      procedureType: dto.procedureType,
      dtOfProcedure: dto.dtOfProcedure,
      description: dto.description,
      veterinarian: dto.veterinarian,
      observation: dto.observation,
    };

    existingProcedure.update({
      ...base,
      ...dto.payload,
      animal,
      expenses: expensesEntities,
      updatedByUserId: loggedUser.id,
    });

    return existingProcedure;
  }
}

import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import { AnimalProcedureEnum } from '../infrastructure/animal-procedures.schema';
import { CreateMedicineProcedureDto } from '@/procedures/medicine-procedure/infrastructure/dto/create-medicine-procedure.dto';
import { CreateSurgeryProcedureDto } from '@/procedures/surgery-procedure/infrastructure/dto/create-surgery-procedure.dto';
import { CreateVaccineProcedureDto } from '@/procedures/vaccine-procedure/infrastructure/dto/create-vaccine-procedure.dto';
import { CreateMiscellaneousProcedureDto } from '@/procedures/miscellaneous-procedure/infrastructure/dto/create-miscellaneous-procedure.dto';
import { Animal } from '@/animals/domain/animal.entity';
import { CreateExpenseDto } from '@/expenses/infrastructure/dto/create-expenses.dto';
import type { AnimalProceduresRepository } from '../domain/animal-procedures.repository';
import { AnimalProcedureFactory } from '../infrastructure/factory/animal-procedures-factory.factory';
import { User } from '@/user/domain/user.entity';
import { AnimalProcedures } from '../domain/animal-procedures.entity';

export type ProcedureDto = {
  procedureType: AnimalProcedureEnum;
  dtOfProcedure?: Date;
  description: string;
  veterinarian?: string;
  observation?: string;
  expenses?: CreateExpenseDto[];
  payload:
    | CreateMedicineProcedureDto
    | CreateSurgeryProcedureDto
    | CreateVaccineProcedureDto
    | CreateMiscellaneousProcedureDto;
};

type Input = {
  dto: ProcedureDto;
  animal: Animal;
  loggedUser: User;
};

/**
 * Specific UseCase to get the animal procedure entity
 *  */
type Output = AnimalProcedures;

@Injectable()
export class CreateAnimalProcedureUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AnimalProceduresRepository')
    private readonly animalProceduresRepository: AnimalProceduresRepository,
  ) {}

  async execute({ dto, animal, loggedUser }: Input): Promise<Output> {
    const animalProcedure = AnimalProcedureFactory.create(
      dto,
      animal,
      loggedUser,
    );

    const animalProcedureEntity = await this.animalProceduresRepository.create(
      animalProcedure.toJSON(),
    );

    return animalProcedureEntity;
  }
}

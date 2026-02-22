import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import { AnimalProcedureEnum } from '../infrastructure/animal-procedures.schema';
import { Animal } from '@/animals/domain/animal.entity';
import type { AnimalProceduresRepository } from '../domain/animal-procedures.repository';
import { AnimalProcedureFactory } from '../infrastructure/factory/animal-procedures.factory';
import { User } from '@/user/domain/user.entity';
import { AnimalProcedures } from '../domain/animal-procedures.entity';
import { UpdateSurgeryProcedureDto } from '@/procedures/surgery-procedure/infrastructure/dto/update-surgery-procedure.dto';
import { UpdateVaccineProcedureDto } from '@/procedures/vaccine-procedure/infrastructure/dto/update-vaccine-procedure.dto';
import { UpdateMedicineProcedureDto } from '@/procedures/medicine-procedure/infrastructure/dto/update-medicine-procedure.dto';
import { UpdateMiscellaneousProcedureDto } from '@/procedures/miscellaneous-procedure/infrastructure/dto/update-miscellaneous-procedure.dto';
import { UpdateExpenseDto } from '@/expenses/infrastructure/dto/update-expenses.dto';
import type { ExpensesRepository } from '@/expenses/domain/expenses.repository';
import { Expenses } from '@/expenses/domain/expenses.entity';
import { ConflictError } from '@/shared/application/errors/conflict-error';
import { NotFoundError } from '@/shared/application/errors/not-found-error';

export type UpdateProcedureDto = {
  procedureType: AnimalProcedureEnum;
  dtOfProcedure?: Date;
  description: string;
  veterinarian?: string;
  observation?: string;
  expenses?: UpdateExpenseDto[];
  payload:
    | UpdateSurgeryProcedureDto
    | UpdateVaccineProcedureDto
    | UpdateMedicineProcedureDto
    | UpdateMiscellaneousProcedureDto;
};

type Input = {
  dto: UpdateProcedureDto;
  animal: Animal;
  loggedUser: User;
};

/**
 * Specific UseCase to get the animal procedure entity
 *  */
type Output = AnimalProcedures;

@Injectable()
export class UpdateAnimalProcedureUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AnimalProceduresRepository')
    private readonly animalProceduresRepository: AnimalProceduresRepository,
    @Inject('ExpensesRepository')
    private readonly expensesRepository: ExpensesRepository,
  ) {}

  async execute({ dto, animal, loggedUser }: Input): Promise<Output> {
    if (!dto.procedureType) {
      throw new ConflictError('O tipo do procedimento é obrigatório');
    }

    if (!dto.description) {
      throw new ConflictError('A descrição do procedimento é obrigatória');
    }

    const procedureId = dto.payload?.id;
    if (!procedureId) {
      throw new ConflictError(
        'ID do procedimento é obrigatório para atualização',
      );
    }

    const existingProcedure =
      await this.animalProceduresRepository.findById(procedureId);

    if (!existingProcedure) {
      throw new NotFoundError(`Procedimento ${procedureId} não encontrado`);
    }

    /**
     * Expenses */
    const expensesEntities: Expenses[] = [];
    if (dto?.expenses) {
      await this.reconcileExpenses(
        dto.expenses,
        animal,
        existingProcedure,
        loggedUser,
        expensesEntities,
      );
    } else {
      const procedure = await this.animalProceduresRepository.findById(
        existingProcedure.id,
      );
      const expensesIdsToDelete = procedure?.expenses
        ?.map(e => e.id)
        .filter(id => id !== undefined && id !== null);

      if (expensesIdsToDelete && expensesIdsToDelete.length > 0) {
        await this.expensesRepository.softDeleteAllByIds(
          expensesIdsToDelete,
          loggedUser.id,
        );
      }
    }

    /**
     * Procedures
     */
    const updatedProcedure = AnimalProcedureFactory.update(
      dto,
      animal,
      loggedUser,
      existingProcedure,
      expensesEntities,
    );

    await this.animalProceduresRepository.update(updatedProcedure.toJSON());

    return updatedProcedure;
  }

  private async reconcileExpenses(
    newExpenses: UpdateExpenseDto[],
    animal: Animal,
    existingProcedure: AnimalProcedures,
    loggedUser: User,
    expensesEntities: Expenses[],
  ) {
    const existingExpenses = existingProcedure.props.expenses || [];
    const newExpenseIds = new Set(
      newExpenses?.map(e => e.id).filter(id => id) || [],
    );

    /**
     * Exclude */
    const expensesToDelete = existingExpenses.filter(
      e => !newExpenseIds.has(e.id),
    );

    if (expensesToDelete.length > 0) {
      await this.expensesRepository.softDeleteAllByIds(
        expensesToDelete.map(e => e.id),
        loggedUser.id,
      );
    }

    for (const expDto of newExpenses) {
      /** Update */
      if (expDto.id) {
        const expense = await this.expensesRepository.findById(expDto.id);

        if (!expense) {
          throw new NotFoundError(`Gasto ${expDto.id} não encontrado`);
        }

        expense.update({
          ...expDto,
          animalProcedure: existingProcedure,
          updatedByUserId: loggedUser.id,
        });

        const updatedExpense = await this.expensesRepository.update(
          expense.toJSON(),
        );

        expensesEntities.push(updatedExpense);
      } else {
        /** Create */
        const newExpense = Expenses.create({
          animal,
          description: expDto.description,
          expenseType: expDto.expenseType,
          paymentType: expDto.paymentType,
          value: expDto.value,
          createdByUserId: loggedUser.id,
          animalProcedure: existingProcedure,
          //expenseAttachment
        });

        const created = await this.expensesRepository.create(
          newExpense.toJSON(),
        );
        expensesEntities.push(created);
      }
    }
  }
}

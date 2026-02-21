import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { AdopterRepository } from '@/adopter/domain/adopter.repository';
import type { AnimalRepository } from '../domain/animal.repository';
import type { AnimalTypeRepository } from '@/animal-type/domain/animal-type.repository';
import type { LoggedUserService } from '@/shared/application/user-service/logged-user';
import { Animal, AnimalGender, AnimalSize } from '../domain/animal.entity';
import { AnimalProcedureEnum } from '@/procedures/animal-procedures/infrastructure/animal-procedures.schema';
import { UpdateSurgeryProcedureDto } from '@/procedures/surgery-procedure/infrastructure/dto/update-surgery-procedure.dto';
import { UpdateVaccineProcedureDto } from '@/procedures/vaccine-procedure/infrastructure/dto/update-vaccine-procedure.dto';
import { UpdateMedicineProcedureDto } from '@/procedures/medicine-procedure/infrastructure/dto/update-medicine-procedure.dto';
import { UpdateMiscellaneousProcedureDto } from '@/procedures/miscellaneous-procedure/infrastructure/dto/update-miscellaneous-procedure.dto';
import { UpdateExpenseDto } from '@/expenses/infrastructure/dto/update-expenses.dto';
import { AnimalOutput } from './outputs/animal.output';
import { ConflictError } from '@/shared/application/errors/conflict-error';
import { Adopter } from '@/adopter/domain/adopter.entity';
import { NotFoundError } from '@/shared/application/errors/not-found-error';
import { UpdateAnimalProcedureUseCase } from '@/procedures/animal-procedures/application/update-animal-procedure.usecase';
import { User } from '@/user/domain/user.entity';
import type { AnimalProceduresRepository } from '@/procedures/animal-procedures/domain/animal-procedures.repository';
import { CreateAnimalProcedureUseCase } from '@/procedures/animal-procedures/application/create-animal-procedure.usecase';
import type { ExpensesRepository } from '@/expenses/domain/expenses.repository';
import { AnimalType } from '@/animal-type/domain/animal-type.entity';
import { Expenses } from '@/expenses/domain/expenses.entity';

type Input = {
  id: string;
  name: string;
  age: number;
  breed: string;
  color: string;
  dtOfBirth?: Date;
  dtOfDeath?: Date;
  dtOfAdoption?: Date;
  dtOfRescue?: Date;
  locationOfRescue?: string;
  adopterId?: string;
  typeId: number;
  size: AnimalSize;
  gender: AnimalGender;
  additionalInfo?: string;
  castrated: boolean;
  expenses?: UpdateExpenseDto[];
  animalProcedures?: {
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
  }[];
};

type Output = AnimalOutput;

@Injectable()
export class UpdateAnimalUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AdopterRepository')
    private readonly adopterRepository: AdopterRepository,
    @Inject('AnimalRepository')
    private readonly animalRepository: AnimalRepository,
    @Inject('AnimalTypeRepository')
    private readonly animalTypeRepository: AnimalTypeRepository,
    @Inject('ExpensesRepository')
    private readonly expensesRepository: ExpensesRepository,
    @Inject('AnimalProceduresRepository')
    private readonly animalProceduresRepository: AnimalProceduresRepository,
    @Inject('LoggedUserService')
    private readonly loggedUserService: LoggedUserService,
    private readonly updateAnimalProcedureUseCase: UpdateAnimalProcedureUseCase,
    private readonly createAnimalProcedureUseCase: CreateAnimalProcedureUseCase,
  ) {}

  async execute(input: Input): Promise<Output> {
    if (!input.id) {
      throw new ConflictError(
        'Não foi possível realizar a atualização devido à falta do identificador único',
      );
    }

    const animal = await this.animalRepository.findById(input.id);
    if (!animal) {
      throw new ConflictError(
        `O animal com identificador ${input.id} não foi encontrado.`,
      );
    }

    const loggedUser = this.loggedUserService.getLoggedUser();

    let animalType: AnimalType = animal.props.type;
    if (!input.typeId) {
      throw new ConflictError('O animal precisa possuir um tipo.');
    }

    if (input.typeId != animalType.id) {
      const newAnimalType = await this.animalTypeRepository.findById(
        input.typeId,
      );

      if (!newAnimalType) {
        throw new NotFoundError(
          `O tipo de animal com o identificador ${input.typeId} não foi encontrado.`,
        );
      }

      animalType = newAnimalType;
    }

    let adopter: Adopter | null = animal.props.adopter;
    if (!input.adopterId) {
      adopter = null;
    } else if (input.adopterId !== adopter?.id) {
      adopter = await this.adopterRepository.findById(input.adopterId);

      if (!adopter) {
        throw new NotFoundError(
          `O adotante com o identificador ${input.adopterId} não foi encontrado.`,
        );
      }
    }

    //  animalType PASSAR PRO CREATE DO ANIMAL
    //  adopter PASSAR PRO CREATE DO ANIMAL
    //   name: PASSAR PRO CREATE DO ANIMAL;
    //   age: PASSAR PRO CREATE DO ANIMAL;
    //   breed: PASSAR PRO CREATE DO ANIMAL;
    //   color: PASSAR PRO CREATE DO ANIMAL;
    //   dtOfBirth?: PASSAR PRO CREATE DO ANIMAL;
    //   dtOfDeath?: PASSAR PRO CREATE DO ANIMAL;
    //   dtOfRescue?: PASSAR PRO CREATE DO ANIMAL;
    //   dtOfAdoption?: PASSAR PRO CREATE DO ANIMAL;
    //   locationOfRescue?: PASSAR PRO CREATE DO ANIMAL;
    //   size: PASSAR PRO CREATE DO ANIMAL;
    //   gender: PASSAR PRO CREATE DO ANIMAL;
    //   additionalInfo?: PASSAR PRO CREATE DO ANIMAL;
    //   castrated: PASSAR PRO CREATE DO ANIMAL;

    /**
     * Animal Expenses without procedures */
    const expensesEntities: Expenses[] = []; //na hr q for retornar tem q ver isso aq melhor pode crer ?
    if (input?.expenses) {
      await this.reconcileExpensesWithoutProcedure(
        input.expenses,
        animal,
        loggedUser,
        expensesEntities,
      );
    } else {
      const expensesWithoutProceduresIds =
        animal.props.expenses.map(e => e.id) || [];

      if (
        expensesWithoutProceduresIds &&
        expensesWithoutProceduresIds.length > 0
      ) {
        await this.expensesRepository.softDeleteAllByIds(
          expensesWithoutProceduresIds,
          loggedUser.id,
        );
      }
    }

    /**
     * Procedures
     */
    // if (input?.animalProcedures && input?.animalProcedures.length > 0) {
    //   await this.reconcileProcedures(
    //     input.animalProcedures,
    //     animal,
    //     loggedUser,
    //   );
    // } else {
    //   /** Exclude procedures (SoftDelete) */
    //   const oldProceduresIds =
    //     animal.props.animalProcedures.map(p => p.id) || [];
    //   if (oldProceduresIds.length > 0) {
    //     /** First delete related expenses */
    //     const oldExpenseIds =
    //       animal.props.animalProcedures?.flatMap(
    //         p => p.expenses?.map(e => e.id) || [],
    //       ) || [];

    //     if (oldExpenseIds.length > 0) {
    //       await this.expensesRepository.softDeleteAllByIds(
    //         oldExpenseIds,
    //         loggedUser.id,
    //       );
    //     }

    //     await this.animalProceduresRepository.softDeleteAllByIds(
    //       oldProceduresIds,
    //       loggedUser.id,
    //     );
    //   }
    // }

    //Resto do Update

    return null;
  }

  private async reconcileProcedures(
    newProcedures: Input['animalProcedures'],
    animal: Animal,
    loggedUser: User,
  ) {
    const existingProcedures = animal.props.animalProcedures || [];

    const newProceduresIds = new Set(
      newProcedures
        .map(p => p.payload?.id)
        .filter(id => id !== undefined && id !== null),
    );

    /**
     * Exclude */
    const proceduresToDelete = existingProcedures.filter(
      existing => !newProceduresIds.has(existing.id),
    );

    /**
     * Process each procedure from input
     */
    for (const newProcedure of newProcedures) {
      const procedureId = newProcedure.payload?.id;

      /** Update */
      if (procedureId) {
        await this.updateAnimalProcedureUseCase.execute({
          dto: newProcedure,
          animal,
          loggedUser,
        });
      } else {
        /** Create */
        await this.createAnimalProcedureUseCase.execute({
          dto: newProcedure,
          animal,
          loggedUser,
        });
      }
    }

    /** SoftDeletes */
    if (proceduresToDelete.length > 0) {
      const expenseIdsToDelete = proceduresToDelete
        .flatMap(p => p.props.expenses?.map(e => e.id) || [])
        .filter(id => id !== undefined);

      if (expenseIdsToDelete.length > 0) {
        await this.expensesRepository.softDeleteAllByIds(
          expenseIdsToDelete,
          loggedUser.id,
        );
      }

      const idsToDelete = proceduresToDelete.map(p => p.id);
      await this.animalProceduresRepository.softDeleteAllByIds(
        idsToDelete,
        loggedUser.id,
      );
    }
  }

  private async reconcileExpensesWithoutProcedure(
    newExpenses: Input['expenses'],
    animal: Animal,
    loggedUser: User,
    expensesEntities: Expenses[],
  ) {
    const existingExpensesWithoutProcedures = animal.props.expenses || [];
    const newExpensesWithoutProceduresIds = new Set(
      newExpenses.map(e => e.id).filter(id => id !== undefined && id !== null),
    );

    /**
     * Exclude
     */
    const expensesToDelete = existingExpensesWithoutProcedures.filter(
      existing => !newExpensesWithoutProceduresIds.has(existing.id),
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
          updatedByUserId: loggedUser.id,
        });

        const updatedExpense = await this.expensesRepository.update(
          expense.toJSON(),
        );

        expensesEntities.push(updatedExpense);
      } else {
        /** Create */
        const newExpense = Expenses.create({
          animal, // TODO TEST Vinculate to an Animal
          description: expDto.description,
          expenseType: expDto.expenseType,
          paymentType: expDto?.paymentType,
          value: expDto.value,
          createdByUserId: loggedUser.id,
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

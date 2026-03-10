import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { AnimalRepository } from '../domain/animal.repository';
import type { LoggedUserService } from '@/shared/application/user-service/logged-user';
import { NotFoundError } from '@/shared/application/errors/not-found-error';
import type { ExpensesRepository } from '@/expenses/domain/expenses.repository';
import type { AnimalProceduresRepository } from '@/procedures/animal-procedures/domain/animal-procedures.repository';

type Input = {
  id: string;
};
type Output = void;

@Injectable()
export class SoftDeleteAnimalUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AnimalRepository')
    private readonly animalRepository: AnimalRepository,
    @Inject('LoggedUserService')
    private readonly loggedUserService: LoggedUserService,
    @Inject('ExpensesRepository')
    private readonly expensesRepository: ExpensesRepository,
    @Inject('AnimalProceduresRepository')
    private readonly animalProceduresRepository: AnimalProceduresRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    if (!input.id) {
      throw new NotFoundError('O animal não foi encontrado.');
    }

    const animal = await this.animalRepository.findById(input.id);

    const loggedUser = this.loggedUserService.getLoggedUser();

    if (animal.props?.expenses?.length > 0) {
      const idsExpensesToDelete = animal.props.expenses.map(e => e.id);

      await this.expensesRepository.softDeleteAllByIds(
        idsExpensesToDelete,
        loggedUser.id,
      );
    }

    if (animal.props?.animalProcedures?.length > 0) {
      const idsProceduresToDelete = animal.props?.animalProcedures.map(
        e => e.id,
      );

      await this.animalProceduresRepository.softDeleteAllByIds(
        idsProceduresToDelete,
        loggedUser.id,
      );
    }

    await this.animalRepository.softDeleteByUserId(input.id, loggedUser.id);
  }
}

import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { AnimalRepository } from '../domain/animal.repository';
import { AnimalOutput, AnimalOutputMapper } from './outputs/animal.output';
import { NotFoundError } from '@/shared/application/errors/not-found-error';
import { Animal } from '../domain/animal.entity';

type Input = {
  id: string;
};

type Output = AnimalOutput;

@Injectable()
export class FindAnimalByIdUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AnimalRepository')
    private readonly animalRepository: AnimalRepository,
    private readonly animalOutputMapper: AnimalOutputMapper,
  ) {}

  async execute(input: Input): Promise<Output> {
    const animal = await this.animalRepository.findById(input.id);

    if (!animal) {
      throw new NotFoundError('Animal não encontrado!');
    }

    return this.animalOutputMapper.toOutput(
      animal.getExpensesWithoutAnimalProcedure(),
      this.calculateTotalCost(animal),
    );
  }

  private calculateTotalCost(animal: Animal): number {
    return animal.expenses?.reduce((total, e) => {
      return total + Number(e.props.value || 0);
    }, 0);
  }
}

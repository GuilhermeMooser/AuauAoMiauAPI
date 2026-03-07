import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import { AnimalTypeOutput } from './animal-type.output';
import type { AnimalTypeRepository } from '../domain/animal-type.repository';

type Input = void;
type Output = AnimalTypeOutput[];

@Injectable()
export class FindAllAnimalTypesUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AnimalTypeRepository')
    private readonly animalTypeRepository: AnimalTypeRepository,
  ) {}

  async execute(): Promise<Output> {
    const animalTypes = await this.animalTypeRepository.findAll();
    return animalTypes;
  }
}

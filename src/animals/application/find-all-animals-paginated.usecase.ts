import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type {
  AnimalFilters,
  AnimalRepository,
} from '../domain/animal.repository';
import {
  Pagination,
  PaginationInput,
} from '@/shared/application/pagination/pagination';
import {
  MinimalAnimalOutput,
  MinimalAnimalOutputMapper,
} from './outputs/minimal-animal.output';

type Input = {
  paginate: PaginationInput;
  search?: string;
  filters?: AnimalFilters;
};
type Output = Pagination<MinimalAnimalOutput>;

@Injectable()
export class FindAllAnimalsPaginatedUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AnimalRepository')
    private readonly animalRepository: AnimalRepository,
    private minimalAnimalOutputMapper: MinimalAnimalOutputMapper,
  ) {}

  async execute({ search, paginate, filters }: Input): Promise<Output> {
    const animalsPagination = await this.animalRepository.search(
      paginate,
      search,
      filters,
    );

    return {
      items: animalsPagination.items.map(animal => {
        return this.minimalAnimalOutputMapper.toOutput(animal);
      }),
      meta: animalsPagination.meta,
    };
  }
}

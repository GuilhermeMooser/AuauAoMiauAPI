import {
  Pagination,
  PaginationInput,
} from '@/shared/application/pagination/pagination';
import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import { AdopterOutput, AdopterOutputMapper } from './outputs/adopter.output';
import type {
  AdopterRepository,
  FiltersAdopter,
} from '../domain/adopter.repository';
import { MinimalAdopterOutput, MinimalAdopterOutputMapper } from './outputs/minimal-adopter.output';

type Input = {
  paginate: PaginationInput;
  search?: string;
  filters?: FiltersAdopter;
};

type Output = Pagination<MinimalAdopterOutput>;

@Injectable()
export class FindAllAdoptersPaginatedUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AdopterRepository')
    private readonly adopterRepository: AdopterRepository,
    private readonly minimalAdopterOutputMapper: MinimalAdopterOutputMapper,
  ) {}

  async execute({ search, paginate, filters }: Input): Promise<Output> {
    const adoptersPagination = await this.adopterRepository.search(
      paginate,
      search,
      filters,
    );

    return {
      items: adoptersPagination.items.map(adopter => {
        return this.minimalAdopterOutputMapper.toOutput(adopter);
      }),
      meta: adoptersPagination.meta,
    };
  }
}

import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { TermFilters, TermRepository } from '../domain/term.repository';
import {
  Pagination,
  PaginationInput,
} from '@/shared/application/pagination/pagination';
import { TermOutput, TermOutputMapper } from './outputs/term.output';

type Input = {
  paginate: PaginationInput;
  search?: string;
  filters?: TermFilters;
};
type Output = Pagination<TermOutput>;

@Injectable()
export class FindAllTermsPaginatedUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('TermRepository')
    private readonly termRepository: TermRepository,
    private readonly termOutputMapper: TermOutputMapper,
  ) {}

  async execute({ search, paginate, filters }: Input): Promise<Output> {
    const termsPagination = await this.termRepository.search(
      paginate,
      search,
      filters,
    );

    return {
      items: termsPagination.items.map(term => {
        return this.termOutputMapper.toOutput(term);
      }),
      meta: termsPagination.meta,
    };
  }
}

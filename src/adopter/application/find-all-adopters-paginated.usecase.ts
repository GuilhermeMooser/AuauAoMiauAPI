import {
  Pagination,
  PaginationInput,
} from '@/shared/application/pagination/pagination';
import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import { AdopterOutput, AdopterOutputMapper } from './outputs/adopter.output';
import type { AdopterRepository } from '../domain/adopter.repository';

type Input = {
  paginate: PaginationInput;
};
type Output = Pagination<AdopterOutput>;

@Injectable()
export class FindAllAdoptersPaginatedUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AdopterRepository')
    private readonly adopterRepository: AdopterRepository,
    private readonly adopterOutputMapper: AdopterOutputMapper,
  ) {}

  async execute({ paginate }: Input): Promise<Output> {
    const adoptersPagination =
      await this.adopterRepository.findAllPaginated(paginate);

    return {
      items: adoptersPagination.items.map(adopter => {
        return this.adopterOutputMapper.toOutput(adopter);
      }),
      meta: adoptersPagination.meta,
    };
  }
}

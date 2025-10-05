import {
  Pagination,
  PaginationInput,
} from '@/shared/application/pagination/pagination';
import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import { AdopterOutput } from './outputs/adopter.output';
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
  ) {}

  async execute({ paginate }: Input): Promise<Output> {
    const adoptersPagination =
      await this.adopterRepository.findAllPaginated(paginate);

    return adoptersPagination;
  }
}

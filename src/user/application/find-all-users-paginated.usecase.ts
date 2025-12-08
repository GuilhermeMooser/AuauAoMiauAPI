import {
  Pagination,
  PaginationInput,
} from '@/shared/application/pagination/pagination';
import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';
import {
  MinimalUserOutput,
  MinimalUserOutputMapper,
} from './outputs/minimal-user.output';

type Input = {
  paginate: PaginationInput;
  search?: string;
};
type Output = Pagination<MinimalUserOutput>;

@Injectable()
export class FindAllUsersPaginatedUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly minimalUserOutputMapper: MinimalUserOutputMapper,
  ) {}

  async execute({ search, paginate }: Input): Promise<Output> {
    const usersPagination = await this.userRepository.search(paginate, search);

    return {
      items: usersPagination.items.map(user => {
        return this.minimalUserOutputMapper.toOutput(user);
      }),
      meta: usersPagination.meta,
    };
  }
}

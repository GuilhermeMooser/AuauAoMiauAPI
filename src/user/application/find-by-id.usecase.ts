import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';
import { NotFoundError } from '@/shared/application/errors/not-found-error';
import { UserPresenter } from '../infrastructure/presenters/user.presenter';
import { UserOutputMapper } from './outputs/user.output';

type Input = {
  id: string;
};

type Output = UserPresenter;

@Injectable()
export class FindByIdUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly userOutputMapper: UserOutputMapper,
  ) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.findById(input.id);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    return this.userOutputMapper.toOutput(user);
  }
}

import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';
import { NotFoundError } from '@/shared/application/errors/not-found-error';
import type { LoggedUserService } from '@/shared/application/user-service/logged-user';

type Input = {
  id: string;
};

type Output = void;

@Injectable()
export class SoftDeleteUserUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('LoggedUserService')
    private readonly loggedUserService: LoggedUserService,
  ) {}

  async execute(input: Input): Promise<void> {
    const user = await this.userRepository.findById(input.id);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const loggedUser = this.loggedUserService.getLoggedUser()
    await this.userRepository.softDeleteByUserId(input.id, loggedUser.id);
  }
}

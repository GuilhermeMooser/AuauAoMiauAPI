import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { TermRepository } from '../domain/term.repository';
import { NotFoundError } from '@/shared/application/errors/not-found-error';
import type { LoggedUserService } from '@/shared/application/user-service/logged-user';

type Input = {
  id: string;
};

type Output = void;

@Injectable()
export class SoftDeleteTermUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('TermRepository')
    private readonly termRepository: TermRepository,
    @Inject('LoggedUserService')
    private readonly loggedUserService: LoggedUserService,
  ) {}

  async execute(input: Input): Promise<Output> {
    if (!input.id) {
      throw new NotFoundError('O animal não foi encontrado.');
    }

    const loggedUser = this.loggedUserService.getLoggedUser();

    await this.termRepository.softDeleteByUserId(input.id, loggedUser.id);
  }
}

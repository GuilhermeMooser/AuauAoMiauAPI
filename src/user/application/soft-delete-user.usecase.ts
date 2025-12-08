import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';
import { NotFoundError } from '@/shared/application/errors/not-found-error';

type Input = {
  id: string;
};

type Output = void;

@Injectable()
export class SoftDeleteUserUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: Input): Promise<void> {
    const user = await this.userRepository.findById(input.id);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const userId = '3038c222-58c4-4bfb-a213-650ca92d9d4c'; //TODO AJUSTAR E VERIFICAR SE N TEM QUE EXCLUIR LOGIGAMENTE O TERM ASSOCIADO AO ADOTANTE
    await this.userRepository.softDeleteByUserId(input.id, userId);
  }
}

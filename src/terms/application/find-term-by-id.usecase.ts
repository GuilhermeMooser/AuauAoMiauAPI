import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { TermRepository } from '../domain/term.repository';
import { TermOutput, TermOutputMapper } from './outputs/term.output';
import { NotFoundError } from '@/shared/application/errors/not-found-error';

type Input = {
  id: string;
};

type Output = TermOutput;

@Injectable()
export class FindTermByIdTermUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('TermRepository')
    private readonly termRepository: TermRepository,
    private readonly termOutputMapper: TermOutputMapper,
  ) {}

  async execute(input: Input): Promise<Output> {
    const term = await this.termRepository.findById(input.id);

    if (!term) {
      throw new NotFoundError('Adotante não encontrado!');
    }

    return this.termOutputMapper.toOutput(term);
  }
}

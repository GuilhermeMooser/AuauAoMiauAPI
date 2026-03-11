import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { TermRepository } from '../domain/term.repository';

type Input = {};
type Output = {};

@Injectable()
export class UpdateTermUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('TermRepository')
    private readonly termRepository: TermRepository,
  ) {}

  execute(input: Input): Output | Promise<Output> {
    throw new Error('Method not implemented.');
  }
}

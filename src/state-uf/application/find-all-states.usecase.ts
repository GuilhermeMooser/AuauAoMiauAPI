import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { StateUfRepository } from '../domain/state-uf.repository';
import { StateUfOutput } from './outputs/state-uf.output';

type Input = null;
type Output = StateUfOutput[];

@Injectable()
export class FindAllStatesUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('StateUfRepository')
    private readonly stateUfRepository: StateUfRepository,
  ) {}

  async execute(): Promise<Output> {
    return await this.stateUfRepository.findAllStates();
  }
}

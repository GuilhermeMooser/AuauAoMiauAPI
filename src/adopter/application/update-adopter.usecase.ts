import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { AdopterRepository } from '../domain/adopter.repository';

type Input = {};
type Output = {};

@Injectable()
export class UpdateAdopterUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AdopterRepository')
    private readonly adopterRepository: AdopterRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    throw new Error('Method not implemented.');
  }
}

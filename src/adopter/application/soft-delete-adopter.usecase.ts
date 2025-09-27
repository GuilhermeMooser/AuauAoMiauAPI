import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { AdopterRepository } from '../domain/adopter.repository';

type Input = {
  id: string;
};

type Output = void;

@Injectable()
export class SoftDeleteAdopterUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AdopterRepository')
    private readonly adopterRepository: AdopterRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    

  }
}

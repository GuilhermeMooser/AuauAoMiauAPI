import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { AdopterRepository } from '../domain/adopter.repository';
import { AdopterOutput, AdopterOutputMapper } from './outputs/adopter.output';

type Input = {
  id: string;
};
type Output = AdopterOutput;

@Injectable()
export class FindAdopterByIdUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AdopterRepository')
    private readonly adopterRepository: AdopterRepository,
    private readonly adopterOutputMapper: AdopterOutputMapper,
  ) {}

  async execute(input: Input): Promise<Output> {
    const adopter = await this.adopterRepository.findById(input.id);
    return this.adopterOutputMapper.toOutput(adopter);
  }
}

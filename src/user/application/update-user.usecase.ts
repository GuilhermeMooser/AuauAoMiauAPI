import { UseCase } from '@/shared/application/usecases/use-case';
import { Injectable } from '@nestjs/common';

type Input = {};
type Output = void;

@Injectable()
export class UpdateUserUseCase implements UseCase<Input, Output> {
  constructor() {}

  async execute(input: Input): Promise<Output> {}
}

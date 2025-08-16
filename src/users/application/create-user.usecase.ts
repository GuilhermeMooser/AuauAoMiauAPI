import { UseCase } from '@/shared/application/usecases/use-case';
import { Injectable } from '@nestjs/common';

type Input = {};
type Output = {};

@Injectable()
export class CreateUserUseCase implements UseCase<Input, Output> {
  execute(input: Input): Promise<Output> {
    throw new Error('Method not implemented.');
  }
}

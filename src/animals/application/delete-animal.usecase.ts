import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { AdopterRepository } from '@/adopter/domain/adopter.repository';
import type { AnimalRepository } from '../domain/animal.repository';
import type { TermRepository } from '@/terms/domain/term.repository';
import type { AnimalTypeRepository } from '@/animal-type/domain/animal-type.repository';
import type { LoggedUserService } from '@/shared/application/user-service/logged-user';

type Input = {};
type Output = {};

@Injectable()
export class DeleteAnimalUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('AdopterRepository')
    private readonly adopterRepository: AdopterRepository,
    @Inject('AnimalRepository')
    private readonly animalRepository: AnimalRepository,
    @Inject('TermRepository')
    private readonly termRepository: TermRepository,
    @Inject('AnimalTypeRepository')
    private readonly animalTypeRepository: AnimalTypeRepository,
    @Inject('LoggedUserService')
    private readonly loggedUserService: LoggedUserService,
  ) {}

  execute(input: Input): Output | Promise<Output> {
    throw new Error('Method not implemented.');
  }
}

import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { TermRepository } from '../domain/term.repository';
import type { AnimalRepository } from '@/animals/domain/animal.repository';
import type { AdopterRepository } from '@/adopter/domain/adopter.repository';
import { NotFoundError } from '@/shared/application/errors/not-found-error';
import { Term } from '../domain/term.entity';
import type { LoggedUserService } from '@/shared/application/user-service/logged-user';
import { TermOutput, TermOutputMapper } from './outputs/term.output';

type Input = {
  animalId: string;
  adopterId: string;
};
type Output = TermOutput;

@Injectable()
export class CreateTermUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('TermRepository')
    private readonly termRepository: TermRepository,
    @Inject('AnimalRepository')
    private readonly animalRepository: AnimalRepository,
    @Inject('AdopterRepository')
    private readonly adopterRepository: AdopterRepository,
    @Inject('LoggedUserService')
    private readonly loggedUserService: LoggedUserService,
    private readonly termOutputMapper: TermOutputMapper,
  ) {}

  async execute(input: Input): Promise<Output> {
    const animal = await this.animalRepository.findById(input.animalId);

    if (!animal) {
      throw new NotFoundError(
        `O animal com identificador ${input.animalId} não foi encontrado.`,
      );
    }

    const adopter = await this.adopterRepository.findById(input.adopterId);

    if (!adopter) {
      throw new NotFoundError(
        `O adotante com identificador ${input.adopterId} não foi encontrado.`,
      );
    }

    const loggedUser = this.loggedUserService.getLoggedUser();

    const term = Term.create({
      animal,
      adopter,
      createdByUserId: loggedUser.id,
    });

    await this.termRepository.create(term.toJSON());

    return this.termOutputMapper.toOutput(term);
  }
}

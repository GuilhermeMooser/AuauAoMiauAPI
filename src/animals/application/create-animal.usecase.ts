import { UseCase } from '@/shared/application/usecases/use-case';
import { Animal, AnimalGender, AnimalSize } from '../domain/animal.entity';
import { AnimalProcedureEnum } from '@/procedures/animal-procedures/infrastructure/animal-procedures.schema';
import { Inject } from '@nestjs/common';
import type { AdopterRepository } from '@/adopter/domain/adopter.repository';
import type { AnimalRepository } from '../domain/animal.repository';
import type { TermRepository } from '@/terms/domain/term.repository';
import type { AnimalTypeRepository } from '@/animal-type/domain/animal-type.repository';
import type { LoggedUserService } from '@/shared/application/user-service/logged-user';
import { CreateAnimalProcedureUseCase } from '@/procedures/animal-procedures/application/create-animal-procedure.usecase';
import { CreateExpenseDto } from '@/expenses/infrastructure/dto/create-expenses.dto';
import { CreateSurgeryProcedureDto } from '@/procedures/surgery-procedure/infrastructure/dto/create-surgery-procedure.dto';
import { CreateVaccineProcedureDto } from '@/procedures/vaccine-procedure/infrastructure/dto/create-vaccine-procedure.dto';
import { CreateMedicineProcedureDto } from '@/procedures/medicine-procedure/infrastructure/dto/create-medicine-procedure.dto';
import { CreateMiscellaneousProcedureDto } from '@/procedures/miscellaneous-procedure/infrastructure/dto/create-miscellaneous-procedure.dto';

type Input = {
  name: string;
  age: number;
  breed: string;
  color: string;
  dtOfBirth?: Date;
  dtOfDeath?: Date;
  dtOfAdoption?: Date;
  dtOfRescue?: Date;
  locationOfRescue?: string;
  adopterId?: string;
  termsIds?: string[];
  typeId: number;
  size: AnimalSize;
  gender: AnimalGender;
  additionalInfo?: string;
  castrated: boolean;
  animalProcedures?: {
    procedureType: AnimalProcedureEnum;
    dtOfProcedure?: Date;
    description: string;
    veterinarian?: string;
    observation?: string;
    expenses?: CreateExpenseDto[];
    payload:
      | CreateSurgeryProcedureDto
      | CreateVaccineProcedureDto
      | CreateMedicineProcedureDto
      | CreateMiscellaneousProcedureDto;
  }[];
};

type Output = {};

export class CreateAnimalUseCase implements UseCase<Input, Output> {
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
    private readonly createAnimalProcedureUseCase: CreateAnimalProcedureUseCase,
  ) {}

  async execute(input: Input): Promise<Output> {
    const adopter = input?.adopterId
      ? await this.adopterRepository.findById(input.adopterId)
      : null;

    const terms =
      input?.termsIds?.length > 0
        ? await this.termRepository.findAllByIds(input.termsIds)
        : null;

    const animalType = await this.animalTypeRepository.findById(input.typeId);

    const loggedUser = this.loggedUserService.getLoggedUser();

    const animal = Animal.create({
      name: input.name,
      age: input.age,
      breed: input.breed,
      color: input.color,
      dtOfBirth: input?.dtOfBirth,
      dtOfDeath: input?.dtOfDeath,
      dtOfRescue: input?.dtOfRescue,
      dtOfAdoption: input?.dtOfAdoption,
      locationOfRescue: input.locationOfRescue,
      adopter: adopter,
      terms: terms,
      type: animalType,
      size: input.size,
      gender: input.gender,
      additionalInfo: input.additionalInfo,
      castrated: input.castrated,
      createdByUserId: loggedUser.id,
    });

    const createdAnimal = await this.animalRepository.create(animal.toJSON());

    if (input.animalProcedures?.length) {
      for (const procedure of input.animalProcedures) {
        await this.createAnimalProcedureUseCase.execute({
          dto: procedure,
          animal: createdAnimal,
        });
      }
    }

    // quando criar o animal ai que vai pras procedures

    console.log(animal);
    // console.log(input);
    throw new Error('Method not implemented.');
  }
}

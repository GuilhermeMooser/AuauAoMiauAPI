import { UseCase } from '@/shared/application/usecases/use-case';
import { Animal, AnimalGender, AnimalSize } from '../domain/animal.entity';
import { AnimalProcedureEnum } from '@/procedures/animal-procedures/infrastructure/animal-procedures.schema';
import { Inject } from '@nestjs/common';
import type { AdopterRepository } from '@/adopter/domain/adopter.repository';
import type { AnimalRepository } from '../domain/animal.repository';
import { Adopter } from '@/adopter/domain/adopter.entity';
import type { TermRepository } from '@/terms/domain/term.repository';
import type { AnimalTypeRepository } from '@/animal-type/domain/animal-type.repository';

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
    payload: any;
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
  ) {}

  async execute(input: Input): Promise<Output> {
    // const adopter = input?.adopterId
    //   ? await this.adopterRepository.findById(input.adopterId)
    //   : null;

    // const terms =
    //   input?.termsIds.length > 0
    //     ? await this.termRepository.findAllByIds(input.termsIds)
    //     : null;

    const adopter = null;

    const terms = null;

    const animalType = await this.animalTypeRepository.findById(input.typeId);

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
    });

    // quando criar o animal ai que vai pras procedures

    console.log(animal);
    // console.log(input);
    throw new Error('Method not implemented.');
  }
}

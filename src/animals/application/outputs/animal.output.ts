import { MinimalAdopterOutput } from '@/adopter/application/outputs/minimal-adopter.output';
import { AnimalType } from '@/animal-type/domain/animal-type.entity';
import { Animal } from '@/animals/domain/animal.entity';
import {
  AnimalProcedureOutput,
  AnimalProcedureOutputMapper,
} from '@/procedures/animal-procedures/application/outputs/animal-procedure.output';
import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { Audit } from '@/shared/domain/entity';
import { TermOutput } from '@/terms/application/outputs/term.output';
import { Injectable } from '@nestjs/common';

export type AnimalOutput = {
  id: string;
  name: string;
  age: number;
  breed: string;
  color: string;
  dtOfBirth?: Date;
  dtOfDeath?: Date;
  dtOfRescue?: Date;
  dtOfAdoption?: Date;
  locationOfRescue?: string;
  adopter?: MinimalAdopterOutput;
  terms?: TermOutput[];
  type: AnimalType;
  size: string;
  gender: string;
  additionalInfo?: string;
  castrated?: boolean;
  animalProcedures?: AnimalProcedureOutput[];
  audit: Audit;
};

@Injectable()
export class AnimalOutputMapper extends OutputMapper<Animal, AnimalOutput> {
  constructor(
    private readonly animalProcedureMapper: AnimalProcedureOutputMapper,
  ) {
    super();
  }

  toOutput(entity: Animal): AnimalOutput {
    return {
      id: entity.props.id,
      name: entity.props.name,
      age: entity.props.age,
      breed: entity.props.breed,
      color: entity.props.color,
      dtOfBirth: entity.props.dtOfBirth,
      dtOfDeath: entity.props.dtOfDeath,
      dtOfRescue: entity.props.dtOfRescue,
      dtOfAdoption: entity.props.dtOfAdoption,
      locationOfRescue: entity.props.locationOfRescue,
      adopter: {
        id: entity.props.adopter.id,
        name: entity.props.adopter.name,
        cpf: entity.props.adopter.cpf,
      } as MinimalAdopterOutput,
      terms: entity.props.terms,
      type: entity.props.type,
      size: entity.props.size,
      gender: entity.props.gender,
      additionalInfo: entity.props.additionalInfo,
      castrated: entity.props.castrated,
      animalProcedures: this.toOutputArray(
        entity.props.animalProcedures,
        this.animalProcedureMapper,
      ),
      audit: entity.props.audit,
    };
  }
}

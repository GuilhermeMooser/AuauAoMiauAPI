import { MinimalAdopterOutput } from '@/adopter/application/outputs/minimal-adopter.output';
import { AnimalType } from '@/animal-type/domain/animal-type.entity';
import { Animal } from '@/animals/domain/animal.entity';
import {
  MinimalExpensesOutput,
  MinimalExpensesOutputMapper,
} from '@/expenses/application/output/minimal-expenses-output';
import {
  AnimalProcedureOutput,
  AnimalProcedureOutputMapper,
} from '@/procedures/animal-procedures/application/outputs/animal-procedure.output';
import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { Audit } from '@/shared/domain/entity';
import {
  TermOutput,
  TermOutputMapper,
} from '@/terms/application/outputs/term.output';
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
  expenses?: MinimalExpensesOutput[];
  audit: Audit;
  totalCost?: number;
};

@Injectable()
export class AnimalOutputMapper extends OutputMapper<Animal, AnimalOutput> {
  constructor(
    private readonly animalProcedureMapper: AnimalProcedureOutputMapper,
    private readonly minimalExpensesOutputMapper: MinimalExpensesOutputMapper,
    // private readonly termOutputMapper: TermOutputMapper,
  ) {
    super();
  }

  toOutput(entity: Animal, totalCost?: number): AnimalOutput {
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
        id: entity.props?.adopter?.id,
        name: entity.props?.adopter?.name,
        cpf: entity.props?.adopter?.cpf,
      } as MinimalAdopterOutput,
      terms:
        entity.props?.terms?.length > 0
          ? (entity.props.terms.map(term => {
              return {
                id: term.id,
              };
            }) as TermOutput[])
          : undefined,
      type: entity.props.type,
      size: entity.props.size,
      gender: entity.props.gender,
      additionalInfo: entity.props.additionalInfo,
      castrated: entity.props.castrated,
      expenses: this.toOutputArray(
        entity.props.expenses,
        this.minimalExpensesOutputMapper,
      ),
      animalProcedures: this.toOutputArray(
        entity.props.animalProcedures,
        this.animalProcedureMapper,
      ),
      audit: entity.props.audit,
      totalCost: totalCost,
    };
  }
}

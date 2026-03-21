import { AnimalType } from '@/animal-type/domain/animal-type.entity';
import { Animal } from '@/animals/domain/animal.entity';
import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { Audit } from '@/shared/domain/entity';
import { TermOutput } from '@/terms/application/outputs/term.output';
import { Injectable } from '@nestjs/common';

export type MinimalAnimalOutput = {
  id: string;
  name: string;
  age: number;
  breed: string;
  dtOfRescue?: Date;
  dtOfDeath?: Date;
  dtOfAdoption?: Date;
  type: AnimalType;
  gender: string;
  castrated?: boolean;
  audit: Audit;
  terms: TermOutput[];
  size: string;
  totalCost?: number;
};

@Injectable()
export class MinimalAnimalOutputMapper extends OutputMapper<
  Animal,
  MinimalAnimalOutput
> {
  toOutput(entity: Animal, totalCost?: number): MinimalAnimalOutput {
    return {
      id: entity.props.id,
      name: entity.props.name,
      age: entity.props.age,
      breed: entity.props.breed,
      dtOfDeath: entity.props.dtOfDeath,
      dtOfRescue: entity.props.dtOfRescue,
      dtOfAdoption: entity.props.dtOfAdoption,
      type: entity.props.type,
      gender: entity.props.gender,
      castrated: entity.props.castrated,
      size: entity.props.size,
      audit: entity.props.audit,
      terms: entity.props?.terms?.map(t => {
        return {
          id: t.id,
        } as TermOutput;
      }),
      totalCost: totalCost,
    };
  }
}

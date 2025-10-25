import { Animal } from '@/animals/domain/animal.entity';
import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { Injectable } from '@nestjs/common';

export type AnimalOutput = {
  name: string;
  age: number;
  breed: string;
  // color: string;
  // dtOfBirth?: Date;
  // dtOfDeath?: Date;
  // dtOfRescue?: Date;
  // dtOfAdoption?: Date;
  // locationOfRescue?: string;
  // adopter?: Adopter;
  // terms?: Term[];
  // type: string;
  // size: string;
  // gender: string;
};
@Injectable()
export class AnimalOutputMapper extends OutputMapper<Animal, AnimalOutput> {
  toOutput(entity: Animal): AnimalOutput {
    return {
      name: entity.props.name,
      age: entity.props.age,
      breed: entity.props.breed,
    };
  }
}

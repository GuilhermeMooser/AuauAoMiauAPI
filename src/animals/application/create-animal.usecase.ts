import { UseCase } from "@/shared/application/usecases/use-case";
import { AnimalGender, AnimalSize } from "../domain/animal.entity";
import { AnimalProcedureEnum } from "@/procedures/animal-procedures/infrastructure/animal-procedures.schema";

type Input = {
  name: string;
  age: number;
  breed: string;
  color: string;
  dtOfBirth?: Date;
  dtOfDeath?: Date;
  dtOfAdoption?: Date;
  locationOfRescue?: string;
  adopterId?: string;
  termsIds?: string[]
  typeId: number;
  size: AnimalSize;
  gender: AnimalGender;
  additionalInfo?: string;
  castrated: boolean;
  animalProcedures?: {
    procedureType: AnimalProcedureEnum;
    payload: any;
  }[]
}

type Output = {}

export class CreateAnimalUseCase implements UseCase<Input, Output> {

  constructor() { }

  execute(input: Input): Promise<Output> {
    console.log(input)
    throw new Error("Method not implemented.");
  }

}
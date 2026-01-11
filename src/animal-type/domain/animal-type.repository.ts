import { Repository } from "@/shared/domain/repositories/repository";
import { AnimalType } from "./animal-type.entity";

export interface AnimalTypeRepository extends Repository<AnimalType> {
  findAll(): Promise<AnimalType[]>;
  deleteById(id: number): void;
}
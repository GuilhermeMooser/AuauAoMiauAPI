import { Repository } from "@/shared/domain/repositories/repository";
import { Animal } from "./animal.entity";

export interface AnimalRepository extends Repository<Animal> {
  findAllByIds(ids: string[]): Promise<Animal[]>;
  removeAdopterReference(ids: string[]): Promise<void>;
}
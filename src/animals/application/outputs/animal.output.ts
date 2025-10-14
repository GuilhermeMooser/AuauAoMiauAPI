import { Animal } from "@/animals/domain/animal.entity";
import { OutputMapper } from "@/shared/application/outputs/output-mapper";

export type AnimalOutput = {

}
export class AnimalOutputMapper extends OutputMapper<Animal, AnimalOutput> {}
import { RepositoryBaseMapper } from "@/shared/domain/repositories/repository-base-mapper";
import { AnimalTypeSchema } from "../animal-type.schema";
import { AnimalType } from "@/animal-type/domain/animal-type.entity";

export class AnimalTypeMapper extends RepositoryBaseMapper<AnimalTypeSchema, AnimalType> {

  private static _instance: AnimalTypeMapper

  static get instance(): AnimalTypeMapper {
    if (!this._instance) {
      this._instance = new AnimalTypeMapper();
    }
    return this._instance;
  }

  toEntity(schema: AnimalTypeSchema): AnimalType {
    if (!schema) return null;

    return new AnimalType({
      id: schema.id,
      type: schema.type
    })
  }
}
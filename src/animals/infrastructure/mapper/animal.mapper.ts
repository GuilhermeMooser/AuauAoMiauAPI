import { RepositoryBaseMapper } from '@/shared/domain/repositories/repository-base-mapper';
import { AnimalSchema } from '../animal.schema';
import { Animal } from '@/animals/domain/animal.entity';

export class AnimalMapper extends RepositoryBaseMapper<AnimalSchema, Animal> {
  private static _instance: AnimalMapper;

  static get instance(): AnimalMapper {
    if (!this._instance) {
      this._instance = new AnimalMapper();
    }
    return this._instance;
  }

  toEntity(schema: AnimalSchema): Animal {
    if (!schema) return null;

    return null
  }
}

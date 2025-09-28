import { RepositoryBaseMapper } from '@/shared/domain/repositories/repository-base-mapper';
import { AnimalSchema } from '../animal.schema';
import { Animal } from '@/animals/domain/animal.entity';
import { AdopterMapper } from '@/adopter/infrastructure/mapper/adopter.mapper';
import { TermMapper } from '@/terms/infrastructure/mapper/term.mapper';

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

    return new Animal({
      id: schema.id,
      age: schema.age,
      breed: schema.breed,
      color: schema.color,
      gender: schema.gender,
      name: schema.name,
      size: schema.size,
      type: schema.type,
      adopter: AdopterMapper.instance.toEntity(schema.adopter),
      audit: {
        createdAt: schema.createdAt,
        deletedAt: schema.deletedAt,
        updatedAt: schema.updatedAt,
      },
      createdByUserId: schema.createdByUserId,
      updatedByUserId: schema.updatedByUserId,
      deletedByUserId: schema.deletedByUserId,
      dtOfAdoption: schema.dtOfAdoption,
      dtOfBirth: schema.dtOfBirth,
      dtOfDeath: schema.dtOfDeath,
      dtOfRescue: schema.dtOfRescue,
      locationOfRescue: schema.locationOfRescue,
      terms: TermMapper.instance.toEntityMany(schema.terms),
    });
  }

  toEntityMany(schemas: AnimalSchema[]): Animal[] {
    return super.toEntityMany(schemas);
  }
}

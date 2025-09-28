import { RepositoryBaseMapper } from '@/shared/domain/repositories/repository-base-mapper';
import { TermSchema } from '../term.schema';
import { Term } from '@/terms/domain/term.entity';
import { AdopterMapper } from '@/adopter/infrastructure/mapper/adopter.mapper';
import { AnimalMapper } from '@/animals/infrastructure/mapper/animal.mapper';

export class TermMapper extends RepositoryBaseMapper<TermSchema, Term> {
  private static _instance: TermMapper;

  static get instance(): TermMapper {
    if (!this._instance) {
      this._instance = new TermMapper();
    }
    return this._instance;
  }

  toEntity(schema: TermSchema): Term {
    if (!schema) return null;

    return new Term({
      id: schema.id,
      adopter: AdopterMapper.instance.toEntity(schema.adopter),
      animal: AnimalMapper.instance.toEntity(schema.animal),
      audit: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
      },
      createdByUserId: schema.createdByUserId,
      updatedByUserId: schema.updatedByUserId,
      deletedByUserId: schema.deletedByUserId,
    });
  }

  toEntityMany(schemas: TermSchema[]): Term[] {
    return super.toEntityMany(schemas);
  }
}

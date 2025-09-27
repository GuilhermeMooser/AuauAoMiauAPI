import { RepositoryBaseMapper } from '@/shared/domain/repositories/repository-base-mapper';
import { AdopterContactSchema } from '../adopter-contact.schema';
import {
  AdopterContact,
  TypeOfContact,
} from '@/adopter-contact/domain/adopter-contact.entity';

export class AdopterContactMapper extends RepositoryBaseMapper<
  AdopterContactSchema,
  AdopterContact
> {
  private static _instance: AdopterContactMapper;

  static get instance(): AdopterContactMapper {
    if (!this._instance) {
      this._instance = new AdopterContactMapper();
    }
    return this._instance;
  }

  toEntity(schema: AdopterContactSchema): AdopterContact {
    if (!schema) return null;

    return new AdopterContact({
      id: schema.id,
      isPrincipal: schema.isPrincipal,
      type: schema.type as TypeOfContact,
      value: schema.value,
      audit: {
        createdAt: schema.createdAt,
        deletedAt: schema.deletedAt,
      },
    });
  }

  toEntityMany(schemas: AdopterContactSchema[]): AdopterContact[] {
    return super.toEntityMany(schemas);
  }
}

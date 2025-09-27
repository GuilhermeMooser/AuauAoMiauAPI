import { AdopterAddress } from '@/adopter-address/domain/adopter-address.entity';
import { AdopterAddressSchema } from '../adopter-address.schema';
import { RepositoryBaseMapper } from '@/shared/domain/repositories/repository-base-mapper';

export class AdopterAddressMapper extends RepositoryBaseMapper<
  AdopterAddressSchema,
  AdopterAddress
> {
  private static _instance: AdopterAddressMapper;

  static get instance(): AdopterAddressMapper {
    if (!this._instance) {
      this._instance = new AdopterAddressMapper();
    }
    return this._instance;
  }

  toEntity(schema: AdopterAddressSchema): AdopterAddress {
    if (!schema) return null;

    return new AdopterAddress({
      id: schema.id,
      city: schema.city,
      street: schema.street,
      audit: {
        createdAt: schema.createdAt,
        deletedAt: schema.deletedAt,
      },
      neighborhood: schema.neighborhood,
      number: schema.number,
    });
  }

  toEntityMany(schemas: AdopterAddressSchema[]): AdopterAddress[] {
    return super.toEntityMany(schemas);
  }
}

import { Adopter, MaritalStatusUnion } from '@/adopter/domain/adopter.entity';
import { AdopterSchema } from '../adopter.schema';
import { RepositoryBaseMapper } from '@/shared/domain/repositories/repository-base-mapper';
import { AdopterAddressMapper } from '@/adopter-address/infrastructure/mapper/adopter-address.mapper';
import { AdopterContactMapper } from '@/adopter-contact/infrastructure/mapper/adopter-contact.mapper';

export class AdopterMapper extends RepositoryBaseMapper<
  AdopterSchema,
  Adopter
> {
  private static _instance: AdopterMapper;

  static get instance(): AdopterMapper {
    if (!this._instance) {
      this._instance = new AdopterMapper();
    }
    return this._instance;
  }

  toEntity(schema: AdopterSchema): Adopter {
    if (!schema) return null;

    return new Adopter({
      id: schema.id,
      activeNotification: schema.activeNotification,
      addresses: AdopterAddressMapper.instance.toEntityMany(schema.addresses),
      civilState: schema.civilState as MaritalStatusUnion,
      contacts: AdopterContactMapper.instance.toEntityMany(schema.contacts),
      cpf: schema.cpf,
      dtOfBirth: schema.dtOfBirth,
      email: schema.email,
      name: schema.name,
      profession: schema.profession,
      rg: schema.rg,
      // animals: schema.animals TODO,
      audit: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
      },
      createdByUserId: schema.createdByUserId,
      deletedByUserId: schema.deletedByUserId,
      dtToNotify: schema.dtToNotify,
      // terms: schema.terms TODO,
      updatedByUserId: schema.updatedByUserId,
    });
  }

  toEntityMany(schemas: AdopterSchema[]): Adopter[] {
    return super.toEntityMany(schemas);
  }
}

import { UserRole } from '@/user-role/domain/user-role.entity';
import { UserRoleSchema } from '../user-role.schema';
import { RepositoryBaseMapper } from '@/shared/domain/repositories/repository-base-mapper';

export class UserRoleMapper extends RepositoryBaseMapper<
  UserRoleSchema,
  UserRole
> {
  private static _instance: UserRoleMapper;

  static get instance(): UserRoleMapper {
    if (!this._instance) {
      this._instance = new UserRoleMapper();
    }
    return this._instance;
  }

  toEntity(schema: UserRoleSchema): UserRole {
    if (!schema) return null;

    return new UserRole({
      id: schema.id,
      name: schema.name
    })
  }
}
//TODO REMOVER PROAVELMENTE
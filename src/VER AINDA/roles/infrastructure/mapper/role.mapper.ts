import { RepositoryBaseMapper } from '@/shared/domain/repositories/repository-base-mapper';
import { RoleSchema } from '../role.schema';
import { Role } from '@/VER AINDA/roles/domain/role.entity';
import { UserMapper } from '@/users/infrastructure/mapper/user.mapper';

export class RoleMapper extends RepositoryBaseMapper<RoleSchema, Role> {
  private static _instance: RoleMapper;

  static get instance(): RoleMapper {
    if (!this._instance) {
      this._instance = new RoleMapper();
    }
    return this._instance;
  }

  toEntity(schema: RoleSchema): Role | null {
    if (!schema) return null;

    return new Role({
      id: schema.id,
      displayName: schema.displayName,
      description: schema.description,
      name: schema.name,
      audit: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
      },
    });
  }

  toEntityMany(schemas: RoleSchema[]): Role[] {
    return super.toEntityMany(schemas);
  }

  toSchema(entity: Role): RoleSchema {
    return {
      id: entity.id,
      name: entity.name,
      displayName: entity.displayName,
      description: entity.description,
      users: UserMapper.instance.toSchemaMany(entity.users),
      // permissions: PermissionMapper.instance
      permissions: [],
    };
  }
}

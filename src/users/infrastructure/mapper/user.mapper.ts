import { User } from '@/users/domain/user.entity';
import { UserSchema } from '../user.schema';
import { RepositoryBaseMapper } from '@/shared/domain/repositories/repository-base-mapper';
import { RoleMapper } from '@/roles/infrastructure/mapper/role.mapper';

export class UserMapper extends RepositoryBaseMapper<UserSchema, User> {
  private static _instance: UserMapper;

  static get instance(): UserMapper {
    if (!this._instance) {
      this._instance = new UserMapper();
    }
    return this._instance;
  }

  toEntity(schema: UserSchema): User | null {
    if (!schema) return null;

    return new User({
      id: schema.id.toString(),
      name: schema.name,
      email: schema.email,
      password: schema.password,
      active: schema.active,
      refreshToken: schema.refreshToken,
      lastLoginAt: schema.lastLoginAt,
      lastLoginIp: schema.lastLoginIp,
      roles: RoleMapper.instance.toEntityMany(schema.roles || []),
      sessions: schema.sessions,
      createdByUserId: schema.createdByUserId?.toString(),
      updatedByUserId: schema.updatedByUserId?.toString(),
      deletedByUserId: schema.deletedByUserId?.toString(),
      audit: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
      },
    });
  }

  toSchema(entity: User): UserSchema {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      active: entity.active,
      refreshToken: entity.refreshToken,
      lastLoginAt: entity.lastLoginAt,
      lastLoginIp: entity.lastLoginIp,
      roles: entity.roles,
      sessions: entity.sessions,
    };
  }
}

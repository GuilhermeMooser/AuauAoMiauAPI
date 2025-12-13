import { RepositoryBaseMapper } from '@/shared/domain/repositories/repository-base-mapper';
import { UserSchema } from '../user.schema';
import { User } from '@/user/domain/user.entity';
import { UserRoleMapper } from '@/user-role/infrastructure/mapper/user-role.mapper';

export class UserMapper extends RepositoryBaseMapper<UserSchema, User> {
  private static _instance: UserMapper;

  static get instance(): UserMapper {
    if (!this._instance) {
      this._instance = new UserMapper();
    }
    return this._instance;
  }

  toEntity(schema: UserSchema): User {
    if (!schema) return null;

    return new User({
      id: schema.id,
      name: schema.name,
      password: schema.password,
      email: schema.email,
      active: schema.active,
      cpf: schema.cpf,
      role: schema.role ? UserRoleMapper.instance.toEntity(schema.role) : null,
      audit: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
      },
      createdByUserId: schema.createdByUserId,
      deletedByUserId: schema.deletedByUserId,
      updatedByUserId: schema.updatedByUserId,
    });
  }

  toEntityMany(schemas: UserSchema[]): User[] {
    return super.toEntityMany(schemas);
  }
}

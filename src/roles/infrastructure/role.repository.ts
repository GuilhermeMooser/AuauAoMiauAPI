import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../domain/role.entity';
import { RoleRepository } from '../domain/role.repository';
import { RoleSchema } from './role.schema';
import { In, Repository } from 'typeorm';
import { RoleMapper } from './mapper/role.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepositoryImpl implements RoleRepository {
  constructor(
    @InjectRepository(RoleSchema)
    private readonly roleRepository: Repository<RoleSchema>,
  ) {}
  findById(id: string): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  softDeleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findRolesByNames(roleNames: string[]): Promise<Role[]> {
    const roles = await this.roleRepository.find({
      where: {
        name: In(roleNames),
      },
    });
    return RoleMapper.instance.toEntityMany(roles);
  }

  create(entity: Partial<Role>): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  update(entity: Role): Promise<Role> {
    throw new Error('Method not implemented.');
  }
}

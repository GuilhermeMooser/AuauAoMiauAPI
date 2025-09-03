import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../domain/role.entity';
import { RoleRepository } from '../domain/role.repository';
import { RoleSchema } from './role.schema';
import { In, Repository } from 'typeorm';

export class RoleRepositoryImpl implements RoleRepository {
  constructor(
    @InjectRepository(RoleSchema)
    private readonly roleRepository: Repository<RoleSchema>,
  ) {}

  async findRolesByNames(roleNames: string[]): Promise<Role[]> {
    return this.roleRepository.find({
      where: {
        name: In(roleNames),
      },
    });
  }

  findById(id: number): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  create(entity: Partial<Role>): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  update(entity: Role): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  softDeleteById(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

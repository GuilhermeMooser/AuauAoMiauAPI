import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from '../domain/user-role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleSchema } from './user-role.schema';
import { Repository } from 'typeorm';
import { UserRole } from '../domain/user-role.entity';

@Injectable()
export class UserRoleRepositoryImpl implements UserRoleRepository {
  constructor(
    @InjectRepository(UserRoleSchema)
    private userRoleRepository: Repository<UserRoleSchema>,
  ) {}

  async findAll(): Promise<UserRole[]> {
    const userRoles = await this.userRoleRepository.find();
    return userRoles;
  }

  async findByTypeId(id: number) {
    const userRole = await this.userRoleRepository.findOne({
      where: {
        id: id,
      },
    });

    return userRole;
  }
}

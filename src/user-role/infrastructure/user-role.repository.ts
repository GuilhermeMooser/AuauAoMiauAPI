import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from '../domain/user-role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleSchema } from './user-role.schema';
import { Repository } from 'typeorm';

@Injectable()
export class UserRoleRepositoryImpl implements UserRoleRepository {
  constructor(
    @InjectRepository(UserRoleSchema)
    private userRoleRepository: Repository<UserRoleSchema>,
  ) {}

  async findByTypeId(id: number) {
    const userRole = await this.userRoleRepository.findOne({
      where: {
        id: id,
      },
    });

    return userRole;
  }
}

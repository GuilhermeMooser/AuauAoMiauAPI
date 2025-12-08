import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { UserSchema } from './user.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { UserMapper } from './mapper/user.mapper';
import { Pagination } from '@/shared/application/pagination/pagination';
import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import {
  MetaPresenter,
  PaginationPresenter,
} from '@/shared/infrastructure/presenters/pagination.presenter';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private userRepository: Repository<UserSchema>,
  ) {}

  async search(
    pagination: PaginationDto,
    search?: string,
  ): Promise<Pagination<User>> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.role', 'ur');

    if (search) {
      queryBuilder.where(
        `LOWER(u.name) LIKE LOWER(:search) OR LOWER(u.cpf) LIKE LOWER(:search) OR LOWER(u.email) LIKE LOWER(:search)`,
        {
          search: `%${search}%`,
        },
      );
    }

    const usersDb = await paginate<UserSchema>(queryBuilder, pagination);
    const usersPaginated = new PaginationPresenter<UserSchema>(
      usersDb.items,
      new MetaPresenter(
        usersDb.meta.totalItems,
        usersDb.meta.itemCount,
        usersDb.meta.itemsPerPage,
        usersDb.meta.totalPages,
        usersDb.meta.currentPage,
      ),
    );

    return {
      items: UserMapper.instance.toEntityMany(usersPaginated.items),
      meta: usersPaginated.meta,
    };
  }

  async findUserLoginById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    return UserMapper.instance.toEntity(user);
  }

  async userCpfExists(cpf: string): Promise<boolean> {
    const cpfExists = await this.userRepository.existsBy({ cpf });
    return cpfExists;
  }

  async userEmailExists(email: string): Promise<boolean> {
    const emailExists = await this.userRepository.existsBy({ email });
    return emailExists;
  }

  async userLoginExists(login: string): Promise<boolean> {
    const userExists = await this.userRepository.existsBy({ name: login });
    return userExists;
  }

  async findByUserLogin(login: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { name: login },
      relations: ['role'],
    });

    return UserMapper.instance.toEntity(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    return UserMapper.instance.toEntity(user);
  }

  async create(entity: Partial<User>): Promise<User> {
    const user = await this.userRepository.save(entity);
    return UserMapper.instance.toEntity(user);
  }

  async update(entity: Partial<User>): Promise<User> {
    const user = await this.userRepository.save(entity);
    return UserMapper.instance.toEntity(user);
  }

  softDeleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async softDeleteByUserId(id: string, userId: string): Promise<void> {
    await this.userRepository.update(id, {
      deletedByUserId: userId,
    });

    await this.userRepository.softDelete(id);
  }
}

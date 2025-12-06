import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { UserSchema } from './user.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { UserMapper } from './mapper/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private userRepository: Repository<UserSchema>,
  ) {}

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

  findById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async create(entity: Partial<User>): Promise<User> {
    const user = await this.userRepository.save(entity);
    return UserMapper.instance.toEntity(user);
  }

  update(entity: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }

  softDeleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  softDeleteByUserId(id: string, userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

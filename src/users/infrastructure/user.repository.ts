import { User } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';

export class UserRepositoryImpl implements UserRepository {
  findById(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }
  create(entity: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(entity: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  softDeleteById(categoryId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

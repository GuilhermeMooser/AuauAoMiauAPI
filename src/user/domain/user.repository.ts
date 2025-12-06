import { Repository } from '@/shared/domain/repositories/repository';
import { User } from './user.entity';

export interface UserRepository extends Repository<User> {
  findByUserLogin(login: string): Promise<User>;
  findUserLoginById(id: string): Promise<User>;
  userLoginExists(login: string): Promise<boolean>;
  userEmailExists(email: string): Promise<boolean>;
  userCpfExists(cpf: string): Promise<boolean>;
}

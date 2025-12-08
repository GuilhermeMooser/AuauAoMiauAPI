import { Repository } from '@/shared/domain/repositories/repository';
import { User } from './user.entity';
import { Pagination } from '@/shared/application/pagination/pagination';
import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';

export interface UserRepository extends Repository<User> {
  findByUserLogin(login: string): Promise<User>;
  findUserLoginById(id: string): Promise<User>;
  userLoginExists(login: string): Promise<boolean>;
  userEmailExists(email: string): Promise<boolean>;
  userCpfExists(cpf: string): Promise<boolean>;
  search(
      pagination: PaginationDto,
      search?: string,
    ): Promise<Pagination<User>>;
}

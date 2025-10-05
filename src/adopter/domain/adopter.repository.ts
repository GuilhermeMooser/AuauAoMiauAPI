import { Repository } from '@/shared/domain/repositories/repository';
import { Adopter } from './adopter.entity';
import { Pagination } from '@/shared/application/pagination/pagination';
import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';

export interface AdopterRepository extends Repository<Adopter> {
  existsCpf(cpf: string): Promise<boolean>;
  existsEmail(email: string): Promise<boolean>;
  findAllPaginated(pagination: PaginationDto): Promise<Pagination<Adopter>>;
}

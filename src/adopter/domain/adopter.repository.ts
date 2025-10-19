import { Repository } from '@/shared/domain/repositories/repository';
import { Adopter } from './adopter.entity';
import { Pagination } from '@/shared/application/pagination/pagination';
import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';
import { StatusType } from '../infrastructure/dto/adopter-filter.dto';

export type FiltersAdopter = {
  status?: StatusType;
  stateUfId?: number;
  cityId?: number;
  createdAt?: string;
  dtToNotify?: string;
};

export interface AdopterRepository extends Repository<Adopter> {
  existsCpf(cpf: string): Promise<boolean>;
  existsEmail(email: string): Promise<boolean>;
  findAllPaginated(pagination: PaginationDto): Promise<Pagination<Adopter>>;
  search(
    pagination: PaginationDto,
    search?: string,
    filters?: FiltersAdopter,
  ): Promise<Pagination<Adopter>>;
}

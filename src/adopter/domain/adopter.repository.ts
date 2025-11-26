import { Repository } from '@/shared/domain/repositories/repository';
import { Adopter } from './adopter.entity';
import { Pagination } from '@/shared/application/pagination/pagination';
import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';

export type FiltersAdopter = {
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

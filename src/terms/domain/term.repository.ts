import { Repository } from '@/shared/domain/repositories/repository';
import { Term } from './term.entity';
import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';
import { Pagination } from '@/shared/application/pagination/pagination';

export type TermFilters = {
  createdAt?: string;
};

export interface TermRepository extends Repository<Term> {
  findAllByIds(ids: string[]): Promise<Term[]>;
  search(
    pagination: PaginationDto,
    search?: string,
    filters?: TermFilters,
  ): Promise<Pagination<Term>>;
}

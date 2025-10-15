import { Repository } from '@/shared/domain/repositories/repository';
import { Adopter } from './adopter.entity';
import { Pagination } from '@/shared/application/pagination/pagination';
import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';
import { StatusType } from '../infrastructure/dto/adopter-filter.dto';

type StateUfDto = {
  id: number;
  name: string;
  acronym: string;
  country: string;
};

type CityDto = {
  id: number;
  name: string;
  stateUf: StateUfDto;
  ibge: number;
};

export type FiltersAdopter = {
  name?: string;
  cpf?: string;
  status?: StatusType;
  stateUf?: StateUfDto;
  city?: CityDto;
  createdAt?: Date;
  dtToNotify?: Date;
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

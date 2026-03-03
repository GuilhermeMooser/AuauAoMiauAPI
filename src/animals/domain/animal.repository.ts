import { Repository } from '@/shared/domain/repositories/repository';
import { Animal } from './animal.entity';
import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';
import { Pagination } from '@/shared/application/pagination/pagination';

export type AnimalFilters = {
  createdAt?: string;
  dtOfAdoption?: string;
  dtOfRescue?: string;
  dtOfDeath?: string;
};

export interface AnimalRepository extends Repository<Animal> {
  findAllByIds(ids: string[]): Promise<Animal[]>;
  removeAdopterReference(ids: string[]): Promise<void>;
  search(
    pagination: PaginationDto,
    search?: string,
    filters?: AnimalFilters,
  ): Promise<Pagination<Animal>>;
}

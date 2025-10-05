import { Injectable } from '@nestjs/common';
import { AdopterRepository } from '../domain/adopter.repository';
import { Adopter } from '../domain/adopter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdopterSchema } from './adopter.schema';
import { AdopterMapper } from './mapper/adopter.mapper';
import { Pagination } from '@/shared/application/pagination/pagination';
import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import {
  MetaPresenter,
  PaginationPresenter,
} from '@/shared/infrastructure/presenters/pagination.presenter';

@Injectable()
export class AdopterRepositoryImpl implements AdopterRepository {
  constructor(
    @InjectRepository(AdopterSchema)
    private readonly adopterRepository: Repository<AdopterSchema>,
  ) {}

  async findAllPaginated(
    pagination: PaginationDto,
  ): Promise<Pagination<Adopter>> {
    const queryBuilder = this.adopterRepository.createQueryBuilder('a');

    const adoptersDb = await paginate<AdopterSchema>(queryBuilder, pagination);

    const adoptersPaginated = new PaginationPresenter<AdopterSchema>(
      adoptersDb.items,
      new MetaPresenter(
        adoptersDb.meta.totalItems,
        adoptersDb.meta.itemCount,
        adoptersDb.meta.itemsPerPage,
        adoptersDb.meta.totalPages,
        adoptersDb.meta.currentPage,
      ),
    );

    return {
      items: AdopterMapper.instance.toEntityMany(adoptersPaginated.items),
      meta: adoptersPaginated.meta,
    };
  }

  async existsCpf(cpf: string): Promise<boolean> {
    return this.adopterRepository.exists({ where: { cpf } });
  }

  existsEmail(email: string): Promise<boolean> {
    return this.adopterRepository.exists({ where: { email } });
  }

  async findById(id: string): Promise<Adopter> {
    const adopter = await this.adopterRepository.findOne({
      where: { id },
      relations: ['addresses', 'contacts', 'terms', 'animals'],
    });
    return AdopterMapper.instance.toEntity(adopter);
  }

  async create(entity: Adopter): Promise<Adopter> {
    const adopter = await this.adopterRepository.save(entity);
    return adopter;
  }

  async update(entity: Adopter): Promise<Adopter> {
    const adopter = await this.adopterRepository.save(entity);
    return adopter;
  }

  async softDeleteById(id: string): Promise<void> {
    await this.adopterRepository.softDelete({ id });
  }

  async softDeleteByUserId(id: string, userId: string): Promise<void> {
    await this.adopterRepository.update(id, {
      deletedByUserId: userId,
    });

    await this.adopterRepository.softDelete(id);
  }
}

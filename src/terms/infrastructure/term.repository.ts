import { Injectable } from '@nestjs/common';
import { Term } from '../domain/term.entity';
import { TermFilters, TermRepository } from '../domain/term.repository';
import { TermMapper } from './mapper/term.mapper';
import { TermSchema } from './term.schema';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from '@/shared/application/pagination/pagination';
import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import {
  MetaPresenter,
  PaginationPresenter,
} from '@/shared/infrastructure/presenters/pagination.presenter';

@Injectable()
export class TermRepositoryImpl implements TermRepository {
  constructor(
    @InjectRepository(TermSchema)
    private readonly termRepository: Repository<TermSchema>,
  ) {}

  //TODO N TEM PESQUISA POR TEXTO
  async search(
    pagination: PaginationDto,
    search?: string,
    filters?: TermFilters,
  ): Promise<Pagination<Term>> {
    const queryBuilder = this.termRepository
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.animal', 'a')
      .leftJoinAndSelect('t.adopter', 'ad');

    // if (search) {
    //   queryBuilder.where(`LOWER(a.name) LIKE LOWER(:search)`, {
    //     search: `%${search}%`,
    //   });
    // }
    
    if (filters) {
      if (filters.createdAt) {
        queryBuilder.andWhere('DATE(t.createdAt) = :createdAt', {
          createdAt: filters.createdAt,
        });
      }
    }

    /** Pagination */
    const termsDb = await paginate<TermSchema>(queryBuilder, pagination);
    const termssPaginated = new PaginationPresenter<TermSchema>(
      termsDb.items,
      new MetaPresenter(
        termsDb.meta.totalItems,
        termsDb.meta.itemCount,
        termsDb.meta.itemsPerPage,
        termsDb.meta.totalPages,
        termsDb.meta.currentPage,
      ),
    );

    return {
      items: TermMapper.instance.toEntityMany(termssPaginated.items),
      meta: termssPaginated.meta,
    };
  }

  async findAllByIds(ids: string[]): Promise<Term[]> {
    const terms = await this.termRepository.find({
      where: { id: In(ids) },
    });

    return TermMapper.instance.toEntityMany(terms);
  }

  async findById(id: string): Promise<Term> {
    const term = await this.termRepository.findOne({
      where: { id },
      relations: ['animal', 'adopter'],
    });

    return TermMapper.instance.toEntity(term);
  }

  async create(entity: Term): Promise<Term> {
    const term = await this.termRepository.save(entity);
    return term;
  }

  async update(entity: Term): Promise<Term> {
    const term = await this.termRepository.save(entity);
    return term;
  }

  async softDeleteById(id: string): Promise<void> {
    await this.termRepository.softDelete({ id });
  }

  async softDeleteByUserId(id: string, userId: string): Promise<void> {
    await this.termRepository.update(id, {
      deletedByUserId: userId,
    });

    await this.termRepository.softDelete(id);
  }
}

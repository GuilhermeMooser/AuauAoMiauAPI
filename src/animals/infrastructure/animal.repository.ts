import { Injectable } from '@nestjs/common';
import { AnimalFilters, AnimalRepository } from '../domain/animal.repository';
import { Animal } from '../domain/animal.entity';
import { AnimalSchema } from './animal.schema';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalMapper } from './mapper/animal.mapper';
import { AdopterSchema } from '@/adopter/infrastructure/adopter.schema';
import { AnimalTypeSchema } from '@/animal-type/infrastructure/animal-type.schema';
import { Pagination } from '@/shared/application/pagination/pagination';
import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import {
  MetaPresenter,
  PaginationPresenter,
} from '@/shared/infrastructure/presenters/pagination.presenter';

@Injectable()
export class AnimalRepositoryImpl implements AnimalRepository {
  constructor(
    @InjectRepository(AnimalSchema)
    private readonly animalRepository: Repository<AnimalSchema>,
  ) {}

  async search(
    pagination: PaginationDto,
    search?: string,
    filters?: AnimalFilters,
  ): Promise<Pagination<Animal>> {
    const queryBuilder = this.animalRepository
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.type', 'at');

    if (search) {
      queryBuilder.where(`LOWER(a.name) LIKE LOWER(:search)`, {
        search: `%${search}%`,
      });
    }

    if (filters) {
      if (filters.createdAt) {
        queryBuilder.andWhere('DATE(a.createdAt) = :createdAt', {
          createdAt: filters.createdAt,
        });
      }
      if (filters.dtOfAdoption) {
        queryBuilder.andWhere('DATE(a.dtOfAdoption) = :dtOfAdoption', {
          dtOfAdoption: filters.dtOfAdoption,
        });
      }
      if (filters.dtOfRescue) {
        queryBuilder.andWhere('DATE(a.dtOfRescue) = :dtOfRescue', {
          dtOfRescue: filters.dtOfRescue,
        });
      }
      if (filters.dtOfDeath) {
        queryBuilder.andWhere('DATE(a.dtOfDeath) = :dtOfDeath', {
          dtOfDeath: filters.dtOfDeath,
        });
      }
    }

    /** Pagination */
    const animalsDb = await paginate<AnimalSchema>(queryBuilder, pagination);
    const animalsPaginated = new PaginationPresenter<AnimalSchema>(
      animalsDb.items,
      new MetaPresenter(
        animalsDb.meta.totalItems,
        animalsDb.meta.itemCount,
        animalsDb.meta.itemsPerPage,
        animalsDb.meta.totalPages,
        animalsDb.meta.currentPage,
      ),
    );

    return {
      items: AnimalMapper.instance.toEntityMany(animalsPaginated.items),
      meta: animalsPaginated.meta,
    };
  }

  async removeAdopterReference(ids: string[]): Promise<void> {
    await this.animalRepository
      .createQueryBuilder()
      .update()
      .set({ adopter: null })
      .where('id IN (:...ids)', { ids })
      .execute();
  }

  async findAllByIds(ids: string[]): Promise<Animal[]> {
    const animals = await this.animalRepository.find({
      where: { id: In(ids) },
      relations: ['adopter', 'terms'],
    });

    return AnimalMapper.instance.toEntityMany(animals);
  }

  async findById(id: string): Promise<Animal> {
    const animal = await this.animalRepository.findOne({
      where: { id },
      relations: [
        'adopter',
        'terms',
        'animalProcedure',
        'expenses',
        'type',
        'animalProcedure.expenses',
        'expenses.animalProcedure',
      ],
    });

    return AnimalMapper.instance.toEntity(animal);
  }

  async create(entity: Animal): Promise<Animal> {
    const animal = await this.animalRepository.save(entity);
    return AnimalMapper.instance.toEntity(animal);
  }

  async update(entity: Animal): Promise<Animal> {
    await this.animalRepository
      .createQueryBuilder()
      .update(AnimalSchema)
      .set({
        name: entity.props.name,
        age: entity.props.age,
        breed: entity.props.breed,
        color: entity.props.color,
        size: entity.props.size,
        gender: entity.props.gender,
        dtOfBirth: entity.props.dtOfBirth,
        dtOfDeath: entity.props.dtOfDeath,
        dtOfRescue: entity.props.dtOfRescue,
        dtOfAdoption: entity.props.dtOfAdoption,
        locationOfRescue: entity.props.locationOfRescue,
        additionalInfo: entity.props.additionalInfo,
        castrated: entity.props.castrated,
        adopter: entity.props.adopter
          ? ({ id: entity.props.adopter.id } as AdopterSchema)
          : null,
        type: { id: entity.props.type.id } as AnimalTypeSchema,
        updatedByUserId: entity.props.updatedByUserId,
      })
      .where('id = :id', { id: entity.props.id })
      .execute();

    return await this.findById(entity.props.id);
  }

  softDeleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async softDeleteByUserId(id: string, userId: string): Promise<void> {
    await this.animalRepository.update(id, {
      deletedByUserId: userId,
    });

    await this.animalRepository.softDelete(id);
  }
}

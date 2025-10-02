import { Injectable } from '@nestjs/common';
import { AnimalRepository } from '../domain/animal.repository';
import { Animal } from '../domain/animal.entity';
import { AnimalSchema } from './animal.schema';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalMapper } from './mapper/animal.mapper';

@Injectable()
export class AnimalRepositoryImpl implements AnimalRepository {
  constructor(
    @InjectRepository(AnimalSchema)
    private readonly animalRepository: Repository<AnimalSchema>,
  ) {}

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

  softDeleteByUserId(id: string, userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Animal> {
    throw new Error('Method not implemented.');
  }
  create(entity: Partial<Animal>): Promise<Animal> {
    throw new Error('Method not implemented.');
  }
  update(entity: Animal): Promise<Animal> {
    throw new Error('Method not implemented.');
  }
  softDeleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

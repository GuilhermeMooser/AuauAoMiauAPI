import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalTypeSchema } from './animal-type.schema';
import { Repository } from 'typeorm';
import { AnimalTypeRepository } from '../domain/animal-type.repository';
import { AnimalType } from '../domain/animal-type.entity';

@Injectable()
export class AnimalTypeRepositoryRepositoryImpl
  implements AnimalTypeRepository
{
  constructor(
    @InjectRepository(AnimalTypeSchema)
    private readonly animalTypeRepositoryRepository: Repository<AnimalTypeSchema>,
  ) {}

  create(entity: Partial<AnimalType>): Promise<AnimalType> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<AnimalType[]> {
    throw new Error('Method not implemented.');
  }

  deleteById(id: number): void {
    throw new Error('Method not implemented.');
  }

  async findById(id: number): Promise<AnimalType> {
    const animalType = await this.animalTypeRepositoryRepository.findOne({
      where: { id },
    });

    return animalType;
  }

  update(entity: Partial<AnimalType>): Promise<AnimalType> {
    throw new Error('Method not implemented.');
  }
  softDeleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  softDeleteByUserId(id: string, userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

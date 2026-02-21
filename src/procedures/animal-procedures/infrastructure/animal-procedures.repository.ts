import { Injectable } from '@nestjs/common';
import { AnimalProceduresRepository } from '../domain/animal-procedures.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalProcedureSchema } from './animal-procedures.schema';
import { Repository } from 'typeorm';
import { AnimalProcedures } from '../domain/animal-procedures.entity';

@Injectable()
export class AnimalProceduresRepositoryImpl
  implements AnimalProceduresRepository
{
  constructor(
    @InjectRepository(AnimalProcedureSchema)
    private readonly animalProceduresRepository: Repository<AnimalProcedureSchema>,
  ) {}

  findById(id: string): Promise<AnimalProcedures> {
    throw new Error('Method not implemented.');
  }

  async create(entity: AnimalProcedures): Promise<AnimalProcedures> {
    const animalProcedure = await this.animalProceduresRepository.save(entity);
    return animalProcedure;
  }

  async update(entity: AnimalProcedures): Promise<AnimalProcedures> {
    const animalProcedure = await this.animalProceduresRepository.save(entity);
    return animalProcedure;
  }

  softDeleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  softDeleteByUserId(id: string, userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async softDeleteAllByIds(ids: string[], userId: string): Promise<void> {
    await this.animalProceduresRepository
      .createQueryBuilder()
      .update()
      .set({
        deletedByUserId: userId,
        deletedAt: () => 'CURRENT_TIMESTAMP',
      })
      .whereInIds(ids)
      .execute();
  }
}

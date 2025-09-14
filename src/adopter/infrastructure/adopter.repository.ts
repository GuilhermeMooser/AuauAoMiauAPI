import { Injectable } from '@nestjs/common';
import { AdopterRepository } from '../domain/adopter.repository';
import { Adopter } from '../domain/adopter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdopterSchema } from './adopter.schema';

@Injectable()
export class AdopterRepositoryImpl implements AdopterRepository {
  constructor(
    @InjectRepository(AdopterSchema)
    private readonly adopterRepository: Repository<AdopterSchema>,
  ) {}

  async existsCpf(cpf: string): Promise<boolean> {
    return this.adopterRepository.exists({ where: { cpf } });
  }

  existsEmail(email: string): Promise<boolean> {
    return this.adopterRepository.exists({ where: { email } });
  }

  findById(id: string): Promise<Adopter> {
    throw new Error('Method not implemented.');
  }

  async create(entity: Adopter): Promise<Adopter> {
    const adopter = await this.adopterRepository.save(entity);
    return adopter;
  }

  update(entity: Adopter): Promise<Adopter> {
    throw new Error('Method not implemented.');
  }

  softDeleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

import { Injectable } from '@nestjs/common';
import type { AdopterContactRepository } from '../domain/adopter-contact.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AdopterContactSchema } from './adopter-contact.schema';
import { Repository } from 'typeorm';

@Injectable()
export class AdopterContactRepositoryImpl implements AdopterContactRepository {
  constructor(
    @InjectRepository(AdopterContactSchema)
    private readonly adopterContactRepository: Repository<AdopterContactSchema>,
  ) {}

  async softDeleteById(id: string): Promise<void> {
    await this.adopterContactRepository.softDelete({ adopter: { id } });
  }
}

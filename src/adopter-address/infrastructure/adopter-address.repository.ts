import { Injectable } from '@nestjs/common';
import { AdopterAddressRepository } from '../domain/adopter-address.repository';
import { AdopterAddressSchema } from './adopter-address.schema';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdopterAddressRepositoryImpl implements AdopterAddressRepository {
  constructor(
    @InjectRepository(AdopterAddressSchema)
    private readonly adopterAddressRepository: Repository<AdopterAddressSchema>,
  ) {}

  async removeAllByIds(ids: string[]) {
    await this.adopterAddressRepository.delete(ids);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.adopterAddressRepository.softDelete({ adopter: { id } });
  }
}

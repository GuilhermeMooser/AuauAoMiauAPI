import { Injectable } from '@nestjs/common';
import { AdopterRepository } from '../domain/adopter.repository';
import { Adopter } from '../domain/adopter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdopterSchema } from './adopter.schema';
import { AdopterMapper } from './mapper/adopter.mapper';

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

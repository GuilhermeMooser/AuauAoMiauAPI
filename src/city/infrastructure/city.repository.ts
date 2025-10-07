import { Injectable } from '@nestjs/common';
import { CityRepository } from '../domain/city.repository';
import { City } from '../domain/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CitySchema } from './city.schema';

@Injectable()
export class CityRepositoryImpl implements CityRepository {
  constructor(
    @InjectRepository(CitySchema)
    private readonly cityRepository: Repository<CitySchema>,
  ) {}

  async findAllByUf(ufId: number): Promise<City[]> {
    const cities = await this.cityRepository.find({
      where: { stateUf: { id: ufId } },
      relations: ['stateUf'],
    });

    return cities;
  }
}

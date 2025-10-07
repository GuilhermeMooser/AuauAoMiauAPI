import { City } from './city.entity';

export interface CityRepository {
  findAllByUf(ufId: number): Promise<City[]>;
}

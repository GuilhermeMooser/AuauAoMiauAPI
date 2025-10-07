import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { CityRepository } from '../domain/city.repository';
import { CityOutput } from './outputs/city.output';

type Input = {
  ufId: number;
};
type Output = CityOutput[];

@Injectable()
export class FindAllCitiesByUfUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('CityRepository')
    private readonly cityRepository: CityRepository,
  ) {}

  async execute({ ufId }: Input) {
    const cities = await this.cityRepository.findAllByUf(ufId);
    return cities;
  }
}

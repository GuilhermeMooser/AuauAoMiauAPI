import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FindAllCitiesByUfUseCase } from '../application/find-all-cities-by-uf.usecase';
import { CityPresenter } from './presenters/city.presenter';

@Controller('api/city/v1')
export class CityController {
  constructor(
    private readonly findAllCitiesUseCase: FindAllCitiesByUfUseCase,
  ) {}

  @Get('/uf/:uf')
  findAll(@Param('uf', ParseIntPipe) ufId: number): Promise<CityPresenter[]> {
    return this.findAllCitiesUseCase.execute({ ufId });
  }
}

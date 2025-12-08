import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FindAllCitiesByUfUseCase } from '../application/find-all-cities-by-uf.usecase';
import { CityPresenter } from './presenters/city.presenter';
import { AuthGuard } from '@/auth/infrastructure/auth.guard';

@UseGuards(AuthGuard)
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

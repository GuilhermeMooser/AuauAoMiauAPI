import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnimalTypePresenter } from './presenter/animal-type.presenter';
import { FindAllAnimalTypesUseCase } from '../application/find-all-animals-type-usecase';

@UseGuards(AuthGuard)
@Controller('/api/animal-type/v1')
export class AnimalTypeController {
  constructor(
    private readonly FindAllAnimalTypesUseCase: FindAllAnimalTypesUseCase,
  ) {}

  @Get()
  findAll(): Promise<AnimalTypePresenter[]> {
    return this.FindAllAnimalTypesUseCase.execute();
  }
}

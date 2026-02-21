import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { AnimalPresenter } from './presenters/animal.presenter';
import { CreateAnimalUseCase } from '../application/create-animal.usecase';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { UpdateAnimalUseCase } from '../application/update-animal.usecase';

@UseGuards(AuthGuard)
@Controller('/api/animal/v1')
export class AnimalController {
  constructor(
    private readonly createAnimalUseCase: CreateAnimalUseCase,
    private readonly updateAnimalUseCase: UpdateAnimalUseCase,
  ) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto): Promise<AnimalPresenter> {
    return this.createAnimalUseCase.execute(createAnimalDto);
  }

  @Put()
  update(@Body() updateAnimalDto: UpdateAnimalDto): Promise<AnimalPresenter> {
    return this.updateAnimalUseCase.execute(updateAnimalDto);
  }
}

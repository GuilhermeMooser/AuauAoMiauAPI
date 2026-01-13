import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { AnimalPresenter } from './presenters/animal.presenter';
import { CreateAnimalUseCase } from '../application/create-animal.usecase';

@UseGuards(AuthGuard)
@Controller('/api/animal/v1')
export class AnimalController {
  constructor(private readonly createAnimalUseCase: CreateAnimalUseCase) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto): Promise<AnimalPresenter> {
    return this.createAnimalUseCase.execute(createAnimalDto);
  }
}

import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { AnimalPresenter } from './presenters/animal.presenter';
import { CreateAnimalUseCase } from '../application/create-animal.usecase';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { UpdateAnimalUseCase } from '../application/update-animal.usecase';
import { FindAnimalByIdUseCase } from '../application/find-animal-by-id.usecase';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';
import { FindAllAnimalsPaginatedUseCase } from '../application/find-all-animals-paginated.usecase';
import { MinimalAnimalPresenter } from './presenters/minimal-animal.presenter';
import { AnimalFilterDto } from './dto/animal-filter.dto';

@UseGuards(AuthGuard)
@Controller('/api/animal/v1')
export class AnimalController {
  constructor(
    private readonly createAnimalUseCase: CreateAnimalUseCase,
    private readonly updateAnimalUseCase: UpdateAnimalUseCase,
    private readonly findAnimalByIdUseCase: FindAnimalByIdUseCase,
    private readonly findAllAnimalsPaginatedUseCase: FindAllAnimalsPaginatedUseCase,
  ) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto): Promise<AnimalPresenter> {
    return this.createAnimalUseCase.execute(createAnimalDto);
  }

  @Put()
  update(@Body() updateAnimalDto: UpdateAnimalDto): Promise<AnimalPresenter> {
    return this.updateAnimalUseCase.execute(updateAnimalDto);
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<AnimalPresenter> {
    return this.findAnimalByIdUseCase.execute({ id });
  }

  @Get()
  findAllPaginated(
    @Query() animalFiltersDto: AnimalFilterDto,
  ): Promise<PaginationPresenter<MinimalAnimalPresenter>> {
    const { s, page, limit, direction, ...filters } = animalFiltersDto;

    // return this.findAllAnimalsPaginatedUseCase.execute({
    //   search: s,
    //   paginate: { limit, page, direction },
    //   filters: filters,
    // });

    return null;
  }
}

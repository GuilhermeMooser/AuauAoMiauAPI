import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateAdopterDto } from './dto/create-adopter.dto';
import { CreateAdopterUseCase } from '../application/create-adopter.usecase';
import { SoftDeleteAdopterUseCase } from '../application/soft-delete-adopter.usecase';
import { UpdateAdopterUseCase } from '../application/update-adopter.usecase';
import { UpdateAdopterDto } from './dto/update-adopter.dto';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';
import { FindAllAdoptersPaginatedUseCase } from '../application/find-all-adopters-paginated.usecase';
import { AdopterPresenter } from './presenters/adopter.presenter';
import { FindAdopterByIdUseCase } from '../application/find-adopter-by-id.usecase';
import { AdopterFilterDto } from './dto/adopter-filter.dto';
import { MinimalAdopterPresenter } from './presenters/minimal-adopter.presenter';

@Controller('/api/adopter/v1')
export class AdopterController {
  constructor(
    private readonly createAdopterUseCase: CreateAdopterUseCase,
    private readonly softDeleteAdopterUseCase: SoftDeleteAdopterUseCase,
    private readonly updateAdopterUseCase: UpdateAdopterUseCase,
    private readonly findAllAdoptersPaginatedUseCase: FindAllAdoptersPaginatedUseCase,
    private readonly findByIdUseCase: FindAdopterByIdUseCase,
  ) {}

  @Post()
  create(
    @Body() createAdopterDto: CreateAdopterDto,
  ): Promise<AdopterPresenter> {
    return this.createAdopterUseCase.execute(createAdopterDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.softDeleteAdopterUseCase.execute({ id });
  }

  @Put()
  update(
    @Body() updateAdopterDto: UpdateAdopterDto,
  ): Promise<AdopterPresenter> {
    return this.updateAdopterUseCase.execute({ ...updateAdopterDto });
  }

  @Get()
  findAllPaginated(
    @Query() adopterFiltersDto: AdopterFilterDto,
  ): Promise<PaginationPresenter<MinimalAdopterPresenter>> {
    const { s, page, limit, direction, ...filters } = adopterFiltersDto;

    return this.findAllAdoptersPaginatedUseCase.execute({
      search: s,
      paginate: { limit, page, direction },
      filters: filters,
    });
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<AdopterPresenter> {
    return this.findByIdUseCase.execute({ id });
  }
}

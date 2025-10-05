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
import { PaginationLimitPipe } from '@/shared/infrastructure/pipes/pagination-limit.pipe';
import { PaginationDirectionPipe } from '@/shared/infrastructure/pipes/pagination-direction.pipe';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';
import { Adopter } from '../domain/adopter.entity';
import { FindAllAdoptersPaginatedUseCase } from '../application/find-all-adopters-paginated.usecase';

@Controller('api/adopter/v1')
export class AdopterController {
  constructor(
    private readonly createAdopterUseCase: CreateAdopterUseCase,
    private readonly softDeleteAdopterUseCase: SoftDeleteAdopterUseCase,
    private readonly updateAdopterUseCase: UpdateAdopterUseCase,
    private readonly findAllAdoptersPaginatedUseCase: FindAllAdoptersPaginatedUseCase,
  ) {}

  @Post()
  create(@Body() createAdopterDto: CreateAdopterDto) {
    return this.createAdopterUseCase.execute(createAdopterDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.softDeleteAdopterUseCase.execute({ id });
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() updateAdopterDto: UpdateAdopterDto,
  ): Promise<any> {
    return this.updateAdopterUseCase.execute({ id, ...updateAdopterDto });
  }

  @Get()
  async findAllPaginated(
    @Query('page') page = 1,
    @Query('limit', PaginationLimitPipe) limit: number,
    @Query('direction', PaginationDirectionPipe)
    direction: 'ASC' | 'DESC' | null,
  ): Promise<PaginationPresenter<any>> {
    return this.findAllAdoptersPaginatedUseCase.execute({
      paginate: { limit, page, direction },
    });
  }
}

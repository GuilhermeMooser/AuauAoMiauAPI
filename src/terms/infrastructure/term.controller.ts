import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTermUseCase } from '../application/create-term.usecase';
import { UpdateTermUseCase } from '../application/update-term.usecase';
import { FindTermByIdTermUseCase } from '../application/find-term-by-id.usecase';
import { FindAllTermsPaginatedUseCase } from '../application/find-all-terms-paginated.usecase';
import { SoftDeleteTermUseCase } from '../application/soft-delete-term.usecase';
import { TermPresenter } from './presenters/term.presenter';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';
import { Roles } from '@/shared/infrastructure/decorators/roles.decorator';
import { Role } from '@/auth/domain/roles';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';
import { TermFilterDto } from './dto/term-filter.dto';

@UseGuards(AuthGuard)
@Controller('/api/terms/v1')
export class TermController {
  constructor(
    private readonly createTermUseCase: CreateTermUseCase,
    private readonly updateTermUseCase: UpdateTermUseCase,
    private readonly findTermByIdTermUseCase: FindTermByIdTermUseCase,
    private readonly findAllTermsPaginatedUseCase: FindAllTermsPaginatedUseCase,
    private readonly softDeleteTermUseCase: SoftDeleteTermUseCase,
  ) {}

  @Post()
  create(@Body() createTermDto: CreateTermDto): Promise<TermPresenter> {
    return this.createTermUseCase.execute(createTermDto);
  }

  // @Put()
  // update(@Body() updateTermDto: UpdateTermDto): Promise<TermPresenter> {
  //   return this.updateTermUseCase.execute(updateTermDto);
  // }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<TermPresenter> {
    return this.findTermByIdTermUseCase.execute({ id });
  }

  @Get()
  findAllPaginated(
    @Query() termFiltersDto: TermFilterDto,
  ): Promise<PaginationPresenter<TermPresenter>> {
    const { s, page, limit, direction, ...filters } = termFiltersDto;

    return this.findAllTermsPaginatedUseCase.execute({
      search: s,
      paginate: { limit, page, direction },
      filters: filters,
    });
  }

  @Roles(Role.Admin)
  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.softDeleteTermUseCase.execute({ id });
  }
}

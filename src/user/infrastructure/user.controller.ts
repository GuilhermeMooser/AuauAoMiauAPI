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
import { CreateUserUseCase } from '../application/create-user.usecase';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import { Roles } from '@/shared/infrastructure/decorators/roles.decorator';
import { Role } from '@/auth/domain/roles';
import { UserFilterDto } from './dto/user-filter.dto';
import { PaginationPresenter } from '@/shared/infrastructure/presenters/pagination.presenter';
import { UserPresenter } from './presenters/user.presenter';
import { MinimalUserPresenter } from './presenters/minimal-user.presenter';
import { FindAllUsersPaginatedUseCase } from '../application/find-all-users-paginated.usecase';
import { SoftDeleteUserUseCase } from '../application/soft-delete-user.usecase';
import { FindByIdUseCase } from '../application/find-by-id.usecase';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserUseCase } from '../application/update-user.usecase';

@UseGuards(AuthGuard)
@Controller('/api/user/v1')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersPaginatedUseCase: FindAllUsersPaginatedUseCase,
    private readonly softDeleteUserUseCase: SoftDeleteUserUseCase,
    private readonly findByIdUseCase: FindByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<MinimalUserPresenter> {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Roles(Role.Admin)
  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.softDeleteUserUseCase.execute({ id });
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<UserPresenter> {
    return this.findByIdUseCase.execute({ id });
  }

  @Put()
  update(
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserPresenter> {
    return this.updateUserUseCase.execute(updateUserDto)
  }

  @Get()
  findAllPaginated(
    @Query() userFiltersDto: UserFilterDto,
  ): Promise<PaginationPresenter<MinimalUserPresenter>> {
    const { s, page, limit, direction } = userFiltersDto;

    return this.findAllUsersPaginatedUseCase.execute({
      search: s,
      paginate: { limit, page, direction },
    });
  }
}

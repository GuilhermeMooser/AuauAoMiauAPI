import { UserPresenter } from '@/users/application/presenters/user.presenter';
import {
  Body,
  Controller,
  // Delete,
  // Get,
  // Param,
  // ParseIntPipe,
  Post,
  // Put,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
// import { UpdateUserDto } from './dtos/updateUser.dto';
// import { FindAllUsersUseCase } from '../application/find-all-users.usecase';
import { CreateUserUseCase } from '../application/create-user.usecase';
import { Roles } from '@/shared/infrastructure/decorators/roles.decorator';
// import { UpdateUserUseCase } from '../application/update-user.usecase';
// import { DeleteUserUseCase } from '../application/delete-user.usecase';

@Controller('api/v1/user')
export class UserController {
  constructor(
    // private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    // private readonly updateUserUseCase: UpdateUserUseCase,
    // private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  // @Get('/find-all')
  // getAllUsers(): Promise<UserPresenter[]> {
  //   return this.findAllUsersUseCase.execute();
  // }

  // constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Roles('admin', 'super-admin')
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserPresenter> {
    return this.createUserUseCase.execute(createUserDto);
  }

  // @Put()
  // update(@Body() updateUserDto: UpdateUserDto): Promise<UserPresenter> {
  //   return this.updateUserUseCase.execute(updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.deleteUserUseCase.execute({ id });
  // }
}

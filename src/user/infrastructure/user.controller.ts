import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserUseCase } from '../application/create-user.usecase';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import { Roles } from '@/shared/infrastructure/decorators/roles.decorator';
import { Role } from '@/auth/domain/roles';

@UseGuards(AuthGuard)
@Controller('/api/user/v1')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }
}

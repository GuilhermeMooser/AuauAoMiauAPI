import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../application/create-user.usecase';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/api/user/v1')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }
}

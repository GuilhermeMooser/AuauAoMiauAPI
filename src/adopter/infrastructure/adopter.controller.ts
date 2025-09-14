import { Body, Controller, Post } from '@nestjs/common';
import { CreateAdopterDto } from './dto/create-adopter.dto';
import { CreateAdopterUseCase } from '../application/create-adopter.usecase';

@Controller('api/adopter/v1')
export class AdopoterController {
  constructor(private readonly createAdopterUseCase: CreateAdopterUseCase) {}

  @Post()
  create(@Body() createAdopterDto: CreateAdopterDto) {
    return this.createAdopterUseCase.execute(createAdopterDto);
  }
}

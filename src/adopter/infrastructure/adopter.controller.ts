import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateAdopterDto } from './dto/create-adopter.dto';
import { CreateAdopterUseCase } from '../application/create-adopter.usecase';
import { SoftDeleteAdopterUseCase } from '../application/soft-delete-adopter.usecase';

@Controller('api/adopter/v1')
export class AdopoterController {
  constructor(
    private readonly createAdopterUseCase: CreateAdopterUseCase,
    private readonly softDeleteAdopterUseCase: SoftDeleteAdopterUseCase,
  ) {}

  @Post()
  create(@Body() createAdopterDto: CreateAdopterDto) {
    return this.createAdopterUseCase.execute(createAdopterDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.softDeleteAdopterUseCase.execute({ id });
  }
}

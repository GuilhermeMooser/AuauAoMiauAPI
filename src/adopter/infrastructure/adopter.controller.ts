import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CreateAdopterDto } from './dto/create-adopter.dto';
import { CreateAdopterUseCase } from '../application/create-adopter.usecase';
import { SoftDeleteAdopterUseCase } from '../application/soft-delete-adopter.usecase';
import { AdopterPresenter } from './presenters/adopter.presenter';
import { UpdateAdopterUseCase } from '../application/update-adopter.usecase';
import { UpdateAdopterDto } from './dto/update-adopter.dto';

@Controller('api/adopter/v1')
export class AdopterController {
  constructor(
    private readonly createAdopterUseCase: CreateAdopterUseCase,
    private readonly softDeleteAdopterUseCase: SoftDeleteAdopterUseCase,
    private readonly updateAdopterUseCase: UpdateAdopterUseCase,
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
}

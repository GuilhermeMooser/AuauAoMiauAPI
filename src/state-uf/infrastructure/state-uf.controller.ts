import { Controller, Get, UseGuards } from '@nestjs/common';
import { FindAllStatesUseCase } from '../application/find-all-states.usecase';
import { StateUfPresenter } from './presenters/state-uf.presenter';
import { AuthGuard } from '@/auth/infrastructure/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/uf/v1')
export class StateUfController {
  constructor(private readonly findAllStatesUseCase: FindAllStatesUseCase) {}

  @Get()
  findAll(): Promise<StateUfPresenter[]> {
    return this.findAllStatesUseCase.execute();
  }
}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserRolePresenter } from './presenters/user-role.presenter';
import { AuthGuard } from '@/auth/infrastructure/auth.guard';
import { FindAllUserRolesUseCase } from '../application/find-all-user-roles.usecase';

@UseGuards(AuthGuard)
@Controller('/api/user-role/v1')
export class UserRoleController {
  constructor(
    private findAllUserRolesUseCase: FindAllUserRolesUseCase
  ) {}

  @Get()
  findAllUserRoles( ): Promise<UserRolePresenter[]> {
    return this.findAllUserRolesUseCase.execute();
  }
}

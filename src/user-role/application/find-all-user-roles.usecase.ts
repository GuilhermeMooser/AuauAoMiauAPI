import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { UserRoleRepository } from '../domain/user-role.repository';
import { UserRoleOutput } from './outputs/user-role.output';

type Input = void;
type Output = UserRoleOutput[];

@Injectable()
export class FindAllUserRolesUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('UserRoleRepository')
    private readonly userRoleRepository: UserRoleRepository,
  ) {}

  async execute(): Promise<Output> {
    const userRoles = await this.userRoleRepository.findAll();
    return userRoles;
  }
}

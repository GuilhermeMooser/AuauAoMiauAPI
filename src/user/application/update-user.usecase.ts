import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';
import { ConflictError } from '@/shared/application/errors/conflict-error';
import { NotFoundError } from '@/shared/application/errors/not-found-error';
import { ResourceFoundError } from '@/shared/application/errors/resource-found-error';
import type { UserRoleRepository } from '@/user-role/domain/user-role.repository';
import { UserRole } from '@/user-role/domain/user-role.entity';
import { UserOutput, UserOutputMapper } from './outputs/user.output';

type Input = {
  id: string;
  user: string;
  password: string;
  email: string;
  cpf: string;
  roleId: number;
  active: boolean;
};

type Output = UserOutput;

@Injectable()
export class UpdateUserUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('UserRoleRepository')
    private readonly userRoleRepository: UserRoleRepository,
    private readonly userOutputMapper: UserOutputMapper,
  ) {}

  async execute(input: Input): Promise<Output> {
    if (!input.id) {
      throw new ConflictError(
        'Não foi possível realizar a atualização devido à falta do identificador único',
      );
    }

    const user = await this.userRepository.findById(input.id);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado!');
    }

    if (input.email !== user.email) {
      const emailExists = await this.userRepository.userEmailExists(
        input.email,
      );
      if (emailExists) {
        throw new ResourceFoundError(
          `Já existe um usuário com o email: ${input.email}`,
        );
      }
    }

    if (input.cpf !== user.cpf) {
      const cpfExists = await this.userRepository.userCpfExists(input.cpf);
      if (cpfExists) {
        throw new ResourceFoundError(
          `Já existe um usuário com o CPF: ${input.cpf}`,
        );
      }
    }

    let roleExistent: UserRole;
    if (input.roleId !== user.role.id) {
      roleExistent = await this.userRoleRepository.findByTypeId(input.roleId);
      if (!roleExistent) {
        throw new ConflictError('Tipo de usuário não encontrado');
      }
    }

    if (input.password.length < 8) {
      throw new ConflictError('A senha precisa possuir mais de 8 caracteres');
    }

    user.update({
      name: input.user,
      password: input.password,
      email: input.email,
      cpf: input.cpf,
      active: input.active,
      role: roleExistent,
    });

    await this.userRepository.update(user.toJSON());
    return this.userOutputMapper.toOutput(user);
  }
}

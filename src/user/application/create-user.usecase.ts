import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';
import { ResourceFoundError } from '@/shared/application/errors/resource-found-error';
import type { UserRoleRepository } from '@/user-role/domain/user-role.repository';
import { ResourceNotFoundError } from '@/shared/application/errors/resource-not-found-error';
import type { Encryption } from '@/shared/application/utils/encryption';
import { User } from '../domain/user.entity';
import {
  MinimalUserOutput,
  MinimalUserOutputMapper,
} from './outputs/minimal-user.output';
import { ConflictError } from '@/shared/application/errors/conflict-error';
import type { LoggedUserService } from '@/shared/application/user-service/logged-user';

type Input = {
  user: string;
  password: string;
  email: string;
  cpf: string;
  roleId: number;
};
type Output = MinimalUserOutput;

@Injectable()
export class CreateUserUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('UserRoleRepository')
    private readonly userRoleRepository: UserRoleRepository,
    @Inject('Encryption') private readonly encryption: Encryption,
    private readonly minimalUserOutputMapper: MinimalUserOutputMapper,
    @Inject('LoggedUserService')
    private readonly loggedUserService: LoggedUserService,

  ) {}

  async execute(input: Input): Promise<Output> {
    const userExists = await this.userRepository.findByUserEmail(input.email);

    if (userExists) {
      throw new ResourceFoundError(
        `Usuário com email: ${input.email} já existe`,
      );
    }

    const cpfExists = await this.userRepository.userCpfExists(input.cpf);

    if (cpfExists) {
      throw new ResourceFoundError(`Usuário com CPF ${input.cpf} já existe`);
    }

    const userType = await this.userRoleRepository.findByTypeId(input.roleId);

    if (!userType) {
      throw new ResourceNotFoundError(
        `Tipo de usuário com código ${input.roleId} não existe`,
      );
    }

    if (input.password.length < 8) {
      throw new ConflictError('A senha precisa possuir mais de 8 caracteres');
    }

    const hashPassword = this.encryption.generateHash(input.password);

    const loggedUser = this.loggedUserService.getLoggedUser();

    const userEntity = User.create({
      cpf: input.cpf,
      email: input.email,
      name: input.user,
      password: hashPassword,
      role: userType,
      active: true,
      createdByUserId: loggedUser.id,
    });

    const createdUser = await this.userRepository.create(userEntity.toJSON());
    delete createdUser.props.password; //TODO Verificar esse bgl das props

    return this.minimalUserOutputMapper.toOutput(createdUser);
  }
}

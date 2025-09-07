import { UseCase } from '@/shared/application/usecases/use-case';
import { Inject, Injectable } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';
import { UserOutput } from '@/shared/application/dtos/user-output';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { User } from '../domain/user.entity';
import * as bcrypt from 'bcrypt';
import type { RoleRepository } from '@/roles/domain/role.repository';
import { ConflictError } from '@/shared/application/errors/conflict-error';

type Input = {
  name: string;
  email: string;
  password: string;
  roleNames: string[];
};

type Output = UserOutput;

@Injectable()
export class CreateUserUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('RoleRepository')
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute({
    email,
    name,
    password,
    roleNames = ['user'],
  }: Input): Promise<Output> {
    const existingUser = await this.userRepository.findByUserEmail(email);
    if (existingUser) {
      throw new ConflictError('Email já está em uso');
    }

    this.validatePassword(password);

    const saltRounds = 14;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const roles = await this.roleRepository.findRolesByNames(roleNames);

    if (roles.length !== roleNames.length) {
      throw new ConflictError('Uma ou mais roles especificadas não existem');
    }

    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      roles,
    });
    console.log(user)
    // return {
    //   user: this.sanitizeUser(user),
    //   message: 'Usuário criado com sucesso pelo administrador',
    // };
    return null;
  }

  private sanitizeUser(user: User): Partial<User> {
    const { password, refreshToken, ...sanitized } = user;
    return sanitized;
  }

  private validatePassword(password: string): void {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);

    if (password.length < minLength) {
      throw new BadRequestError('Senha deve ter pelo menos 8 caracteres');
    }

    if (!hasUpperCase) {
      throw new BadRequestError(
        'Senha deve ter pelo menos uma letra maiúscula',
      );
    }

    if (!hasLowerCase) {
      throw new BadRequestError(
        'Senha deve ter pelo menos uma letra minúscula',
      );
    }

    if (!hasNumbers) {
      throw new BadRequestError('Senha deve ter pelo menos um número');
    }

    if (!hasNonalphas) {
      throw new BadRequestError(
        'Senha deve ter pelo menos um caractere especial',
      );
    }
  }
}

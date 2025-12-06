/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { SessionRepository } from '@/session/domain/session.repository';
import { AuthConstants } from '@/shared/application/constants/auth-constants';
import { UnauthorizedError } from '@/shared/application/errors/unauthorized-error';
import type { LoggedUserService } from '@/shared/application/user-service/logged-user';
import { User } from '@/user/domain/user.entity';
import type { UserRepository } from '@/user/domain/user.repository';
import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../domain/roles';
import { ROLES_KEY } from '@/shared/infrastructure/decorators/roles.decorator';
import { ForbiddenError } from '@/shared/application/errors/forbidden-error';

type Payload = {
  sub: string;
  login: string;
  role: { id: number; name: string };
  jti?: string;
  iat: number;
  exp: number;
};

export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('LoggedUserService')
    private readonly loggedUserService: LoggedUserService,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('SessionRepository')
    private readonly sessionRepository: SessionRepository,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies[AuthConstants.tokenName];

    if (!token) {
      throw new UnauthorizedError();
    }

    let payload: Payload = null;

    try {
      payload = await this.jwtService.verifyAsync<Payload>(token);

      const loggedUser = await this.userRepository.findUserLoginById(
        payload.sub,
      );

      if (!loggedUser || !loggedUser.active) {
        throw new UnauthorizedError();
      }

      const userSession = await this.sessionRepository.findByUserIdAndJti(
        loggedUser.id,
        payload.jti,
      );

      if (!userSession) {
        throw new UnauthorizedError();
      }

      request.user = payload;

      this.validateRoles(context, loggedUser);
      this.loggedUserService.setLoggedUser(loggedUser);
    } catch (error) {
      throw new UnauthorizedError();
    }

    return true;
  }

  private validateRoles(context: ExecutionContext, loggedUser: User) {
    if ((loggedUser.role.name as Role) === Role.Admin) return true;

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const isSomeRole = requiredRoles.some(
      role => (loggedUser?.role?.name as Role) === role,
    );

    if (!isSomeRole) {
      throw new ForbiddenError('Recurso proibido');
    }
  }
}

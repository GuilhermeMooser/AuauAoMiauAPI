/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RESOURCE_OWNER_KEY } from '../decorators/resource-owner.decorator';
import { ForbiddenError } from '@/shared/application/errors/forbidden-error';

@Injectable()
export class ResourceOwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ownershipConfig = this.reflector.getAllAndOverride<{
      param: string;
      userField: string;
    }>(RESOURCE_OWNER_KEY, [context.getHandler(), context.getClass()]);

    if (!ownershipConfig) {
      return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { user, params } = request;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (user.roles?.some(role => role.name === 'super-admin')) {
      return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const resourceId = params[ownershipConfig.param];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = user[ownershipConfig.userField];

    if (resourceId !== userId) {
      throw new ForbiddenError(
        'Acesso negado: você só pode acessar seus próprios recursos',
      );
    }

    return true;
  }
}

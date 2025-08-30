import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RESOURCE_OWNER_KEY } from '../decorators/resource-owner.decorator';

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

    const request = context.switchToHttp().getRequest();
    const { user, params } = request;

    if (user.roles?.some(role => role.name === 'super-admin')) {
      return true;
    }

    const resourceId = params[ownershipConfig.param];
    const userId = user[ownershipConfig.userField];

    if (resourceId !== userId) {
      throw new ForbiddenException(
        'Acesso negado: você só pode acessar seus próprios recursos',
      );
    }

    return true;
  }
}

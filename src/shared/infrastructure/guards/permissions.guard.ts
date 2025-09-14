// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
// import { User } from '@/users/domain/user.entity';

// @Injectable()
// export class PermissionsGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
//       PERMISSIONS_KEY,
//       [context.getHandler(), context.getClass()],
//     );

//     if (!requiredPermissions) {
//       return true;
//     }

//     const { user } = context.switchToHttp().getRequest<{ user?: User }>();

//     if (!user) {
//       return false;
//     }

//     const userPermissions: string[] =
//       user.roles?.flatMap(role =>
//         role.permissions?.map(permission => permission.name),
//       ) || [];

//     return requiredPermissions.every(permission =>
//       userPermissions.includes(permission),
//     );
//   }
// }

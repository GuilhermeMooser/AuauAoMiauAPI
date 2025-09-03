// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Permission } from '../entities/permission.entity';
// import { Role } from '../entities/role.entity';

// @Injectable()
// export class PermissionsSeeder {
//   constructor(
//     @InjectRepository(Permission)
//     private permissionRepo: Repository<Permission>,
//     @InjectRepository(Role)
//     private roleRepo: Repository<Role>,
//   ) {}

//   async seed() {
//     // Definir permissões base
//     const permissions = [
//       // User Management
//       { name: 'users:create', displayName: 'Criar Usuários', resource: 'users', action: 'create' },
//       { name: 'users:read', displayName: 'Ver Usuários', resource: 'users', action: 'read' },
//       { name: 'users:update', displayName: 'Editar Usuários', resource: 'users', action: 'update' },
//       { name: 'users:delete', displayName: 'Excluir Usuários', resource: 'users', action: 'delete' },

//       // Role Management
//       { name: 'roles:create', displayName: 'Criar Roles', resource: 'roles', action: 'create' },
//       { name: 'roles:read', displayName: 'Ver Roles', resource: 'roles', action: 'read' },
//       { name: 'roles:update', displayName: 'Editar Roles', resource: 'roles', action: 'update' },
//       { name: 'roles:delete', displayName: 'Excluir Roles', resource: 'roles', action: 'delete' },

//       // Content Management
//       { name: 'posts:create', displayName: 'Criar Posts', resource: 'posts', action: 'create' },
//       { name: 'posts:read', displayName: 'Ver Posts', resource: 'posts', action: 'read' },
//       { name: 'posts:update', displayName: 'Editar Posts', resource: 'posts', action: 'update' },
//       { name: 'posts:delete', displayName: 'Excluir Posts', resource: 'posts', action: 'delete' },

//       // Dashboard & Analytics
//       { name: 'dashboard:view', displayName: 'Ver Dashboard', resource: 'dashboard', action: 'read' },
//       { name: 'analytics:view', displayName: 'Ver Analytics', resource: 'analytics', action: 'read' },

//       // System Admin
//       { name: 'system:admin', displayName: 'Admin Sistema', resource: 'system', action: 'admin' },
//     ];

//     // Criar permissões
//     for (const perm of permissions) {
//       const existing = await this.permissionRepo.findOne({ where: { name: perm.name } });
//       if (!existing) {
//         await this.permissionRepo.save(perm);
//       }
//     }

//     // Criar roles base
//     const roles = [
//       {
//         name: 'super-admin',
//         displayName: 'Super Administrador',
//         description: 'Acesso total ao sistema',
//         permissions: permissions.map(p => p.name)
//       },
//       {
//         name: 'admin',
//         displayName: 'Administrador',
//         description: 'Administrador do sistema',
//         permissions: [
//           'users:create', 'users:read', 'users:update',
//           'roles:read', 'posts:create', 'posts:read',
//           'posts:update', 'posts:delete', 'dashboard:view'
//         ]
//       },
//       {
//         name: 'editor',
//         displayName: 'Editor',
//         description: 'Editor de conteúdo',
//         permissions: [
//           'posts:create', 'posts:read', 'posts:update',
//           'dashboard:view'
//         ]
//       },
//       {
//         name: 'user',
//         displayName: 'Usuário',
//         description: 'Usuário comum',
//         permissions: ['posts:read']
//       }
//     ];

//     for (const roleData of roles) {
//       let role = await this.roleRepo.findOne({
//         where: { name: roleData.name },
//         relations: ['permissions']
//       });

//       if (!role) {
//         role = this.roleRepo.create({
//           name: roleData.name,
//           displayName: roleData.displayName,
//           description: roleData.description
//         });
//       }

//       // Associar permissões
//       const rolePermissions = await this.permissionRepo.find({
//         where: roleData.permissions.map(name => ({ name }))
//       });

//       role.permissions = rolePermissions;
//       await this.roleRepo.save(role);
//     }
//   }
// }

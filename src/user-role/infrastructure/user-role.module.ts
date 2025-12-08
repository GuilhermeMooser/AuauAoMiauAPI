import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleSchema } from './user-role.schema';
import { UserRoleRepositoryImpl } from './user-role.repository';
import { UserRoleController } from './user-role.controller';
import { FindAllUserRolesUseCase } from '../application/find-all-user-roles.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleSchema])],
  controllers: [UserRoleController],
  providers: [
    FindAllUserRolesUseCase,
    {
      provide: 'UserRoleRepository',
      useClass: UserRoleRepositoryImpl,
    },
  ],
  exports: ['UserRoleRepository'],
})
export class UserRoleModule {}

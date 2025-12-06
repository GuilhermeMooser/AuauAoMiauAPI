import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleSchema } from './user-role.schema';
import { UserRoleRepositoryImpl } from './user-role.repository';
// import { CreateUserRoleUseCase } from '../application/create-user-role.usecase';
// import { UserRoleController } from './user-role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleSchema])],
  // controllers: [UserRoleController],
  providers: [
    // CreateUserRoleUseCase,
    {
      provide: 'UserRoleRepository',
      useClass: UserRoleRepositoryImpl,
    },
  ],
  exports: ['UserRoleRepository'],
})
export class UserRoleModule {}

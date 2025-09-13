import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from '../application/create-user.usecase';
import { UserRepositoryImpl } from './user.repository';
import { UserSchema } from './user.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from '@/VER AINDA/roles/infrastructure/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema]), RoleModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UserModule {}

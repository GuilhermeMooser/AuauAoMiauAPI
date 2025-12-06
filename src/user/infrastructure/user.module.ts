import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepositoryImpl } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './user.schema';
import { UtilsModule } from '@/shared/infrastructure/utils/utils.module';
import { UserRoleModule } from '@/user-role/infrastructure/user-role.module';
import { CreateUserUseCase } from '../application/create-user.usecase';
import { UserOutputMapper } from '../application/outputs/user.output';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    UtilsModule,
    UserRoleModule,
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    UserOutputMapper,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
  exports: ['UserRepository'],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginUseCase } from '../application/login.usecase';
import { JwtConfigModule } from '@/shared/infrastructure/jwt/jwt.module';
import { EnvConfigModule } from '@/shared/infrastructure/env-config/env-config.module';
import { UserModule } from '@/user/infrastructure/user.module';
import { SessionModule } from '@/session/infrastructure/session.module';
import { UtilsModule } from '@/shared/infrastructure/utils/utils.module';
import { LoginOutputMapper } from '../application/outputs/login.output';
import { LogoutUseCase } from '../application/logout.usecase';

@Module({
  imports: [
    JwtConfigModule,
    UtilsModule,
    EnvConfigModule,
    UserModule,
    SessionModule,
  ],
  providers: [LoginUseCase, LogoutUseCase, LoginOutputMapper],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}

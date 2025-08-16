import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { UserModule } from './users/infrastructure/user.module';

@Module({
  imports: [EnvConfigModule],
  providers: [UserModule],
})
export class AppModule {}

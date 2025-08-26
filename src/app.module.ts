import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { UserModule } from './users/infrastructure/user.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';

@Module({
  imports: [EnvConfigModule, DatabaseModule, UserModule],
})
export class AppModule {}

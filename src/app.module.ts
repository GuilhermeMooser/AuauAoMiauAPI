import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { AdopterModule } from './adopter/adopter.module';

@Module({
  imports: [EnvConfigModule, DatabaseModule, AdopterModule],
})
export class AppModule {}

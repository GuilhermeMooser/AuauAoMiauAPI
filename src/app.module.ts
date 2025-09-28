import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { AdopterModule } from './adopter/adopter.module';
import { AdopterContactModule } from './adopter-contact/infrastructure/adopter-contact.module';
import { AdopterAddressModule } from './adopter-address/infrastructure/adopter-address.module';
import { TermModule } from './terms/infrastructure/term.module';

@Module({
  imports: [
    EnvConfigModule,
    DatabaseModule,
    AdopterModule,
    AdopterContactModule,
    AdopterAddressModule,
    TermModule,
  ],
})
export class AppModule {}

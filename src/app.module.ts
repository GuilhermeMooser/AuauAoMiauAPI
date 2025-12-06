import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { AdopterModule } from './adopter/infrastructure/adopter.module';
import { AdopterContactModule } from './adopter-contact/infrastructure/adopter-contact.module';
import { AdopterAddressModule } from './adopter-address/infrastructure/adopter-address.module';
import { TermModule } from './terms/infrastructure/term.module';
import { CityModule } from './city/infrastructure/city.module';
import { StateUfModule } from './state-uf/infrastructure/state-uf.module';
import { AuthModule } from './auth/infrastructure/auth.module';
import { UserModule } from './user/infrastructure/user.module';
import { UserRoleModule } from './user-role/infrastructure/user-role.module';
import { UtilsModule } from './shared/infrastructure/utils/utils.module';
import { SessionModule } from './session/infrastructure/session.module';

@Module({
  imports: [
    EnvConfigModule,
    DatabaseModule,
    AdopterModule,
    AdopterContactModule,
    AdopterAddressModule,
    TermModule,
    CityModule,
    StateUfModule,
    AuthModule,
    UserModule,
    UserRoleModule,
    UtilsModule,
    SessionModule,
  ],
})
export class AppModule {}

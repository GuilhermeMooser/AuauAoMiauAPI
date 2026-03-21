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
import { UserServiceModule } from './shared/infrastructure/user-service/user-service.module';
import { AnimalProcedureModule } from './procedures/animal-procedures/infrastructure/animal-procedures.module';
import { ExpensesModule } from './expenses/infrastructure/expenses.module';
import { AnimalTypeModule } from './animal-type/infrastructure/animal-type.module';
import { AnimalModule } from './animals/infrastructure/animal.module';
import { AdopterRepositoryModule } from './adopter/infrastructure/adopter-repository.module';
import { AnimalRepositoryModule } from './animals/infrastructure/animal-repository.module';
import { MapperModule } from './shared/infrastructure/global-mapper/global-mapper.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationModule } from './notification/infrastructure/notification.module';
import { HandleImagesModule } from './shared/infrastructure/images/handle-images.module';

@Module({
  imports: [
    EnvConfigModule,
    DatabaseModule,
    ScheduleModule.forRoot(),
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
    UserServiceModule,
    ExpensesModule,
    AnimalProcedureModule,
    AnimalTypeModule,
    AnimalModule,
    AnimalRepositoryModule,
    AdopterRepositoryModule,
    MapperModule,
    NotificationModule,
    HandleImagesModule
  ],
})
export class AppModule {}

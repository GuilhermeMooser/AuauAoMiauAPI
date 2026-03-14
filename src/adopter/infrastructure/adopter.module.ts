import { Module } from '@nestjs/common';
import { AdopterController } from './adopter.controller';
import { AdopterSchema } from './adopter.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdopterRepositoryImpl } from './adopter.repository';
import { CreateAdopterUseCase } from '../application/create-adopter.usecase';
import { AdopterOutputMapper } from '../application/outputs/adopter.output';
import { AdopterContactModule } from '@/adopter-contact/infrastructure/adopter-contact.module';
import { AdopterAddressModule } from '@/adopter-address/infrastructure/adopter-address.module';
import { SoftDeleteAdopterUseCase } from '../application/soft-delete-adopter.usecase';
import { TermModule } from '@/terms/infrastructure/term.module';
import { UpdateAdopterUseCase } from '../application/update-adopter.usecase';
import { FindAllAdoptersPaginatedUseCase } from '../application/find-all-adopters-paginated.usecase';
import { FindAdopterByIdUseCase } from '../application/find-adopter-by-id.usecase';
import { AnimalRepositoryModule } from '@/animals/infrastructure/animal-repository.module';
import { MapperModule } from '@/shared/infrastructure/global-mapper/global-mapper.module';
import { NotifyAdopterUseCase } from '../application/notify-adopter.usecase';
import { NotificationModule } from '@/notification/infrastructure/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdopterSchema]),
    AdopterContactModule,
    AdopterAddressModule,
    AnimalRepositoryModule,
    TermModule,
    AdopterAddressModule,
    MapperModule,
    NotificationModule
  ],
  controllers: [AdopterController],
  providers: [
    CreateAdopterUseCase,
    SoftDeleteAdopterUseCase,
    UpdateAdopterUseCase,
    FindAllAdoptersPaginatedUseCase,
    FindAdopterByIdUseCase,
    NotifyAdopterUseCase,
    {
      provide: 'AdopterRepository',
      useClass: AdopterRepositoryImpl,
    },
  ],
  exports: ['AdopterRepository'],
})
export class AdopterModule {}

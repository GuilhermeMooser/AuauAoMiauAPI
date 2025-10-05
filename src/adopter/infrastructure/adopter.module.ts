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
import { AnimalModule } from '@/animals/infrastructure/animal.module';
import { UpdateAdopterUseCase } from '../application/update-adopter.usecase';
import { FindAllAdoptersPaginatedUseCase } from '../application/find-all-adopters-paginated.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdopterSchema]),
    AdopterContactModule,
    AdopterAddressModule,
    AnimalModule,
    TermModule,
  ],
  controllers: [AdopterController],
  providers: [
    CreateAdopterUseCase,
    SoftDeleteAdopterUseCase,
    UpdateAdopterUseCase,
    AdopterOutputMapper,
    FindAllAdoptersPaginatedUseCase,
    {
      provide: 'AdopterRepository',
      useClass: AdopterRepositoryImpl,
    },
  ],
})
export class AdopterModule {}

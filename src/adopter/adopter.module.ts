import { Module } from '@nestjs/common';
import { AdopterController } from './infrastructure/adopter.controller';
import { AdopterSchema } from './infrastructure/adopter.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdopterRepositoryImpl } from './infrastructure/adopter.repository';
import { CreateAdopterUseCase } from './application/create-adopter.usecase';
import { AdopterOutputMapper } from './application/outputs/adopter.output';
import { AdopterContactModule } from '@/adopter-contact/infrastructure/adopter-contact.module';
import { AdopterAddressModule } from '@/adopter-address/infrastructure/adopter-address.module';
import { SoftDeleteAdopterUseCase } from './application/soft-delete-adopter.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdopterSchema]),
    AdopterContactModule,
    AdopterAddressModule,
  ],
  controllers: [AdopterController],
  providers: [
    CreateAdopterUseCase,
    AdopterOutputMapper,
    SoftDeleteAdopterUseCase,
    {
      provide: 'AdopterRepository',
      useClass: AdopterRepositoryImpl,
    },
  ],
})
export class AdopterModule {}

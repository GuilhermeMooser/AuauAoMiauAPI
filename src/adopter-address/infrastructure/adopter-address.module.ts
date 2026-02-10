import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdopterAddressSchema } from './adopter-address.schema';
import { AdopterAddressRepositoryImpl } from './adopter-address.repository';
import { AdopterAddressOutputMapper } from '../application/outputs/adopter-address.output';
import { MapperModule } from '@/shared/infrastructure/global-mapper/global-mapper.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdopterAddressSchema]), MapperModule],
  providers: [
    {
      provide: 'AdopterAddressRepository',
      useClass: AdopterAddressRepositoryImpl,
    },
  ],
  exports: ['AdopterAddressRepository'],
})
export class AdopterAddressModule {}

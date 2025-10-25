import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdopterAddressSchema } from './adopter-address.schema';
import { AdopterAddressRepositoryImpl } from './adopter-address.repository';
import { AdopterAddressOutputMapper } from '../application/outputs/adopter-address.output';

@Module({
  imports: [TypeOrmModule.forFeature([AdopterAddressSchema])],
  providers: [
    AdopterAddressOutputMapper,
    {
      provide: 'AdopterAddressRepository',
      useClass: AdopterAddressRepositoryImpl,
    },
  ],
  exports: ['AdopterAddressRepository', AdopterAddressOutputMapper],
})
export class AdopterAddressModule {}

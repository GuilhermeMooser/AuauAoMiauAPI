import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdopterAddressSchema } from './adopter-address.schema';
import { AdopterAddressRepositoryImpl } from './adopter-address.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdopterAddressSchema])],
  providers: [
    {
      provide: 'AdopterAddressRepository',
      useClass: AdopterAddressRepositoryImpl,
    },
  ],
  exports: ['AdopterAddressRepository'],
})
export class AdopterAddressModule {}

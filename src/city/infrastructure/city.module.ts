import { Module } from '@nestjs/common';
import { CitySchema } from './city.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from './city.controller';
import { CityRepositoryImpl } from './city.repository';
import { FindAllCitiesByUfUseCase } from '../application/find-all-cities-by-uf.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([CitySchema])],
  controllers: [CityController],
  providers: [
    FindAllCitiesByUfUseCase,
    {
      provide: 'CityRepository',
      useClass: CityRepositoryImpl,
    },
  ],
  exports: ['CityRepository'],
})
export class CityModule {}

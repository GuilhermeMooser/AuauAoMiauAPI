import { Module } from '@nestjs/common';
import { AnimalSchema } from './animal.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalRepositoryImpl } from './animal.repository';
import { AnimalOutputMapper } from '../application/outputs/animal.output';
import { MapperModule } from '@/shared/infrastructure/global-mapper/global-mapper.module';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalSchema]), MapperModule],
  providers: [
    {
      provide: 'AnimalRepository',
      useClass: AnimalRepositoryImpl,
    },
  ],
  exports: ['AnimalRepository'],
})
export class AnimalRepositoryModule {}

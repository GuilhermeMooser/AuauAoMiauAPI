import { Module } from '@nestjs/common';
import { AnimalSchema } from './animal.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalRepositoryImpl } from './animal.repository';
import { AnimalOutputMapper } from '../application/outputs/animal.output';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalSchema])],
  providers: [
    AnimalOutputMapper,
    {
      provide: 'AnimalRepository',
      useClass: AnimalRepositoryImpl,
    },
  ],
  exports: ['AnimalRepository', AnimalOutputMapper],
})
export class AnimalModule {}

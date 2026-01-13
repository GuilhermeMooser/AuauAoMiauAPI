import { Module } from '@nestjs/common';
import { AnimalSchema } from './animal.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalRepositoryImpl } from './animal.repository';
import { AnimalOutputMapper } from '../application/outputs/animal.output';
import { CreateAnimalUseCase } from '../application/create-animal.usecase';
import { AnimalController } from './animal.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalSchema])],
  controllers: [AnimalController],
  providers: [
    AnimalOutputMapper,
    CreateAnimalUseCase,
    {
      provide: 'AnimalRepository',
      useClass: AnimalRepositoryImpl,
    },
  ],
  exports: ['AnimalRepository', AnimalOutputMapper],
})
export class AnimalModule { }

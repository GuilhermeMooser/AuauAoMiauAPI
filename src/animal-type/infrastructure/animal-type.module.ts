import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalTypeSchema } from './animal-type.schema';
import { AnimalTypeRepositoryRepositoryImpl } from './animal-type.repository';
import { FindAllAnimalTypesUseCase } from '../application/find-all-animals-type-usecase';
import { AnimalTypeController } from './animal-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalTypeSchema])],
  providers: [
    FindAllAnimalTypesUseCase,
    {
      provide: 'AnimalTypeRepository',
      useClass: AnimalTypeRepositoryRepositoryImpl,
    },
  ],
  controllers: [AnimalTypeController],
  exports: ['AnimalTypeRepository'],
})
export class AnimalTypeModule {}

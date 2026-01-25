import { Module } from '@nestjs/common';
import { AnimalProcedureSchema } from './animal-procedures.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalProceduresRepositoryImpl } from './animal-procedures.repository';
import { CreateAnimalProcedureUseCase } from '../application/create-animal-procedure.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalProcedureSchema])],
  providers: [
    CreateAnimalProcedureUseCase,
    {
      provide: 'AnimalProceduresRepository',
      useClass: AnimalProceduresRepositoryImpl,
    },
  ],
  exports: ['AnimalProceduresRepository', CreateAnimalProcedureUseCase],
})
export class AnimalProcedureModule {}

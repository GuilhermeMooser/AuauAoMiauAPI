import { Module } from '@nestjs/common';
import { AnimalProcedureSchema } from './animal-procedures.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalProceduresRepositoryImpl } from './animal-procedures.repository';
import { CreateAnimalProcedureUseCase } from '../application/create-animal-procedure.usecase';
import { ExpensesModule } from '@/expenses/infrastructure/expenses.module';
import { AnimalProcedureOutputMapper } from '../application/outputs/animal-procedure.output';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalProcedureSchema]), ExpensesModule],
  providers: [
    CreateAnimalProcedureUseCase,
    AnimalProcedureOutputMapper,
    {
      provide: 'AnimalProceduresRepository',
      useClass: AnimalProceduresRepositoryImpl,
    },
  ],
  exports: [
    'AnimalProceduresRepository',
    CreateAnimalProcedureUseCase,
    AnimalProcedureOutputMapper,
  ],
})
export class AnimalProcedureModule {}
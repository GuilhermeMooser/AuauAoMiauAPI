import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesSchema } from './expenses.schema';
import { ExpensesRepositoryImpl } from './expenses.repository';
import { MinimalExpensesOutputMapper } from '../application/output/minimal-expenses-output';

@Module({
  imports: [TypeOrmModule.forFeature([ExpensesSchema])],
  providers: [
    MinimalExpensesOutputMapper,
    {
      provide: 'ExpensesRepository',
      useClass: ExpensesRepositoryImpl,
    },
  ],
  exports: ['ExpensesRepository', MinimalExpensesOutputMapper],
})
export class ExpensesModule {}

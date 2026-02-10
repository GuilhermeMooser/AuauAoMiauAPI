import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesSchema } from './expenses.schema';
import { ExpensesRepositoryImpl } from './expenses.repository';
import { MinimalExpensesOutputMapper } from '../application/output/minimal-expenses-output';
import { MapperModule } from '@/shared/infrastructure/global-mapper/global-mapper.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExpensesSchema]), MapperModule],
  providers: [
    {
      provide: 'ExpensesRepository',
      useClass: ExpensesRepositoryImpl,
    },
  ],
  exports: ['ExpensesRepository'],
})
export class ExpensesModule {}

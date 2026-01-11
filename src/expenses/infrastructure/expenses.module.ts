import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExpensesSchema } from "./expenses.schema";
import { ExpensesRepositoryImpl } from "./expenses.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ExpensesSchema])],
  providers: [
    {
      provide: 'ExpensesRepository',
      useClass: ExpensesRepositoryImpl
    }
  ],
  exports: ['ExpensesRepository']
})
export class ExpensesModule { }
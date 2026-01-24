import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MedicineProcedureSchema } from "./medicine-procedure.schema";
import { MedicineProcedureRepositoryImpl } from "./medicine-procedure.repository";
import { CreateMedicineProcedureUseCase } from "../application/create-medicine-procedure.usecase";
import { ExpensesModule } from "@/expenses/infrastructure/expenses.module";

@Module({
  imports: [TypeOrmModule.forFeature([MedicineProcedureSchema]), ExpensesModule],
  providers: [
    CreateMedicineProcedureUseCase,
    {
      provide: 'MedicineProcedureRepository',
      useClass: MedicineProcedureRepositoryImpl
    }
  ],
  exports: ['MedicineProcedureRepository', CreateMedicineProcedureUseCase]
})
export class MedicineProcedureModule { }
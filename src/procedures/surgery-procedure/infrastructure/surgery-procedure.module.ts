import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SurgeryProcedureSchema } from "./surgery-procedure.schema";
import { SurgeryProcedureRepositoryImpl } from "./surgery-procedure.repository";

@Module({
  imports: [TypeOrmModule.forFeature([SurgeryProcedureSchema])],
  providers: [
    {
      provide: 'SurgeryProcedureRepository',
      useClass: SurgeryProcedureRepositoryImpl
    }
  ],
  exports: ['SurgeryProcedureRepository']
})
export class SurgeryProcedureModule { }
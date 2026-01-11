import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MedicineProcedureSchema } from "./medicine-procedure.schema";
import { MedicineProcedureRepositoryImpl } from "./medicine-procedure.repository";

@Module({
  imports: [TypeOrmModule.forFeature([MedicineProcedureSchema])],
  providers: [
    {
      provide: 'MedicineProcedureRepository',
      useClass: MedicineProcedureRepositoryImpl
    }
  ],
  exports: ['MedicineProcedureRepository']
})
export class MedicineProcedureModule { }
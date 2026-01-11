import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccineProcedureSchema } from "./vaccine-procedure.schema";
import { VaccineProcedureRepositoryImpl } from "./vaccine-procedure.repository";

@Module({
  imports: [TypeOrmModule.forFeature([VaccineProcedureSchema])],
  providers: [
    {
      provide: 'VaccineProcedureRepository',
      useClass: VaccineProcedureRepositoryImpl
    }
  ],
  exports: ['VaccineProcedureRepository']
})
export class VaccineProcedureModule { }
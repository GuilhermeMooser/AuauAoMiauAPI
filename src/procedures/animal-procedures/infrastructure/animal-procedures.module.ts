import { Module } from "@nestjs/common";
import { AnimalProcedureSchema } from "./animal-procedures.schema";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnimalProceduresRepositoryImpl } from "./animal-procedures.repository";
import { MedicineProcedureModule } from "@/procedures/medicine-procedure/infrastructure/medicine-procedure.module";
import { MiscellaneousProcedureModule } from "@/procedures/miscellaneous-procedure/infrastructure/miscellaneous-procedure.module";
import { SurgeryProcedureModule } from "@/procedures/surgery-procedure/infrastructure/surgery-procedure.module";
import { VaccineProcedureModule } from "@/procedures/vaccine-procedure/infrastructure/vaccine-procedure.module";
import { CreateAnimalProcedureUseCase } from "../application/create-animal-procedure.usecase";

@Module({
  imports: [TypeOrmModule.forFeature([AnimalProcedureSchema]), MedicineProcedureModule, MiscellaneousProcedureModule, SurgeryProcedureModule, VaccineProcedureModule],
  providers: [
    CreateAnimalProcedureUseCase,
    {
      provide: 'AnimalProceduresRepository',
      useClass: AnimalProceduresRepositoryImpl
    }
  ],
  exports: ['AnimalProceduresRepository', CreateAnimalProcedureUseCase],
})
export class AnimalProcedureModule {}
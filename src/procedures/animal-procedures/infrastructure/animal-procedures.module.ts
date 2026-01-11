import { Module } from "@nestjs/common";
import { AnimalProcedureSchema } from "./animal-procedures.schema";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnimalProceduresRepositoryImpl } from "./animal-procedures.repository";

@Module({
  imports: [TypeOrmModule.forFeature([AnimalProcedureSchema]),],
  providers: [
    {
      provide: 'AnimalProceduresRepository',
      useClass: AnimalProceduresRepositoryImpl
    }
  ],
  exports: ['AnimalProceduresRepository'],
})
export class AnimalProcedureModule { }
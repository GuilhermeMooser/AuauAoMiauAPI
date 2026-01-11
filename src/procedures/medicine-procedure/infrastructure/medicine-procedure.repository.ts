import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicineProcedureSchema } from "./medicine-procedure.schema";
import { Repository } from "typeorm";
import { MedicineProcedureRepository } from "../domain/medicine-procedure.repository";

@Injectable()
export class MedicineProcedureRepositoryImpl implements MedicineProcedureRepository {

  constructor(
    @InjectRepository(MedicineProcedureSchema)
    private readonly medicineProcedureRepository: Repository<MedicineProcedureSchema>
  ) { }
}
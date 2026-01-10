import { AnimalProcedureEnum, AnimalProcedureSchema } from "@/procedures/animal-procedures/infrastructure/animal-procedures.schema";
import { ChildEntity, Column, Entity } from "typeorm";

@ChildEntity(AnimalProcedureEnum.MISCELLANEOUS)
@Entity('miscellaneous_procedure')
export abstract class MiscellaneousProcedureSchema extends AnimalProcedureSchema {
  @Column({ name: 'reason', length: 400 })
  reason: string;

  @Column({ name: 'recomendations', nullable: true, length: 600 })
  recomendations: string;
}
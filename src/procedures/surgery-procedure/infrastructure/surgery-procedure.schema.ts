import { AnimalProcedureEnum, AnimalProcedureSchema } from "@/procedures/animal-procedures/infrastructure/animal-procedures.schema";
import { ChildEntity, Column, Entity } from "typeorm";

@ChildEntity(AnimalProcedureEnum.SURGERY)
@Entity('surgery_procedure')
export abstract class SurgeryProcedureSchema extends AnimalProcedureSchema {

  @Column({ name: 'surgeryName' })
  surgeryName: string;

  @Column({ name: 'surgeryType', nullable: true})
  surgeryType: string;

  @Column({ name: 'local', nullable: true})
  local: string;

  @Column({ name: 'reason' })
  reason: string;

  @Column({ name: 'dtOfDuration', nullable: true })
  dtOfDuration: Date;

  @Column({ name: 'recomendations', nullable: true })
  recomendations: string;
}
import { AnimalProcedureEnum, AnimalProcedureSchema } from "@/procedures/animal-procedures/infrastructure/animal-procedures.schema";
import { ChildEntity, Column, Entity } from "typeorm";

@ChildEntity(AnimalProcedureEnum.MEDICINE)
@Entity('medicine_procedure')
export abstract class MedicineProcedureSchema extends AnimalProcedureSchema {

  @Column({ name: 'medicineName' })
  medicineName: string;

  @Column({ name: 'reason', length: 400 })
  reason: string;

  @Column({ name: 'dosage', nullable: true })
  dosage: string;

  @Column({ name: 'frequency', nullable: true })
  frequency: string;

  @Column({ name: 'dtOfTreatment', nullable: true })
  dtOfTreatment: Date;

  @Column({ name: 'dtOfStart' })
  dtOfStart: Date;

  @Column({ name: 'dtOfEnd', nullable: true })
  dtOfEnd: Date;
}
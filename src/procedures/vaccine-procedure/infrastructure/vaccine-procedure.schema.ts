import { AnimalProcedureEnum, AnimalProcedureSchema } from "@/procedures/animal-procedures/infrastructure/animal-procedures.schema";
import { ChildEntity, Column, Entity } from "typeorm";

@ChildEntity(AnimalProcedureEnum.VACCINE)
@Entity('vaccine_procedure')
export abstract class VaccineProcedureSchema extends AnimalProcedureSchema {

  @Column({ name: 'vaccineName' })
  vaccineName: string;

  @Column({ name: 'vaccineType', nullable: true })
  vaccineType: string;

  @Column({ name: 'batch', nullable: true })
  batch: string;

  @Column({ name: 'manufacturer', nullable: true })
  manufacturer: string;

  @Column({ name: 'dtOfExpiration', nullable: true })
  dtOfExpiration: Date;
}
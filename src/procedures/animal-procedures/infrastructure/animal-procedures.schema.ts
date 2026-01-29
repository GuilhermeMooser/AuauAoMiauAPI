import { AnimalSchema } from '@/animals/infrastructure/animal.schema';
import { ExpensesSchema } from '@/expenses/infrastructure/expenses.schema';
import { UserAuditableSchema } from '@/shared/infrastructure/auditable/user-auditable.schema';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

export enum AnimalProcedureEnum {
  VACCINE = 'VACCINE',
  MEDICINE = 'MEDICINE',
  SURGERY = 'SURGERY',
  MISCELLANEOUS = 'MISCELLANEOUS',
}

@Entity('animal_procedure')
export class AnimalProcedureSchema extends UserAuditableSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AnimalSchema, animal => animal.animalProcedure)
  @JoinColumn({ name: 'animal_id' })
  animal: AnimalSchema;

  @Column({
    name: 'procedure_type',
    type: 'enum',
    enum: AnimalProcedureEnum,
  })
  procedureType: AnimalProcedureEnum;

  @Column({ name: 'dtOfProcedure', nullable: true })
  dtOfProcedure?: Date;

  @Column({ name: 'description', length: 400 })
  description: string;

  @Column({ name: 'veterinarian', nullable: true })
  veterinarian?: string;

  @Column({ name: 'observation', nullable: true, length: 255 })
  observation?: string;

  @OneToMany(() => ExpensesSchema, expenses => expenses.animalProcedure, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  expenses: ExpensesSchema[];

  //Daughters
  @Column({ name: 'medicineName', nullable: true, length: 255 })
  medicineName: string;

  @Column({ name: 'reason', length: 400, nullable: true })
  reason: string;

  @Column({ name: 'dosage', nullable: true })
  dosage: string;

  @Column({ name: 'frequency', nullable: true })
  frequency: string;

  @Column({ name: 'dtOfStart', nullable: true })
  dtOfStart: Date;

  @Column({ name: 'dtOfEnd', nullable: true })
  dtOfEnd: Date;

  @Column({ name: 'recomendations', nullable: true, length: 600 })
  recomendations: string;

  @Column({ name: 'surgeryName', nullable: true })
  surgeryName: string;

  @Column({ name: 'surgeryType', nullable: true })
  surgeryType: string;

  @Column({ name: 'local', nullable: true })
  local: string;

  @Column({ name: 'dtOfDuration', nullable: true })
  dtOfDuration: Date;

  @Column({ name: 'vaccineName', nullable: true, length: 300 })
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

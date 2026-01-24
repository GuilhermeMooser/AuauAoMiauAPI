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
@TableInheritance({
  column: {
    type: 'enum',
    enum: AnimalProcedureEnum,
    name: 'procedure_type',
  },
})
export abstract class AnimalProcedureSchema extends UserAuditableSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AnimalSchema, animal => animal.animalProcedure)
  @JoinColumn({ name: 'animal_id' })
  animal: AnimalSchema;

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
}

import { AdopterSchema } from '@/adopter/infrastructure/adopter.schema';
import { AnimalTypeSchema } from '@/animal-type/infrastructure/animal-type.schema';
import { ExpensesSchema } from '@/expenses/infrastructure/expenses.schema';
import { AnimalProcedureSchema } from '@/procedures/animal-procedures/infrastructure/animal-procedures.schema';
import { UserAuditableSchema } from '@/shared/infrastructure/auditable/user-auditable.schema';
import { TermSchema } from '@/terms/infrastructure/term.schema';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('animal')
export class AnimalSchema extends UserAuditableSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'age' })
  age: number;

  @Column({ name: 'breed' })
  breed: string;

  @Column({ name: 'color' })
  color: string;

  @Column({ name: 'dtOfBirth', nullable: true })
  dtOfBirth: Date;

  @Column({ name: 'dtOfDeath', nullable: true })
  dtOfDeath: Date;

  @Column({ name: 'dtOfRescue', nullable: true })
  dtOfRescue: Date;

  @Column({ name: 'dtOfAdoption', nullable: true })
  dtOfAdoption: Date;

  @Column({ name: 'locationOfRescue', nullable: true })
  locationOfRescue: string;

  @JoinColumn({ name: 'adopter_id' })
  @ManyToOne(() => AdopterSchema, adopter => adopter.animals, {
    nullable: true,
  })
  adopter: AdopterSchema;

  @OneToMany(() => TermSchema, term => term.animal, {
    nullable: true,
  })
  terms: TermSchema[];

  @OneToOne(() => AnimalTypeSchema)
  @JoinColumn({ name: 'animal_type_id' })
  type: AnimalTypeSchema;

  @Column({ name: 'size' })
  size: string;

  @Column({ name: 'gender' })
  gender: string;

  @Column({ name: 'castrated', nullable: true })
  castrated: string;

  @OneToMany(
    () => AnimalProcedureSchema,
    animalProcedure => animalProcedure.animal,
  )
  animalProcedure: AnimalProcedureSchema[];

  @OneToMany(() => ExpensesSchema, expenses => expenses.animal, {
    cascade: true,
  })
  expenses: ExpensesSchema[]; //TODO VERIFICAR OS MÉTODOS DE CREATE E UPDATE PQ O ANIMAL PODE TER EXPENSES SEM TER PROCEDIMENTO

  // photos
  //historicOfProcedures
  //father AUTORELACIONAMENTO
  //mother AUTORELACIONAMENTO
  //documents
  //expenses
  //historic os photos, etc
}

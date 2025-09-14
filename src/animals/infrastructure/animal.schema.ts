import { AdopterSchema } from '@/adopter/infrastructure/adopter.schema';
import { UserAuditableSchema } from '@/shared/infrastructure/auditable/user-auditable.schema';
import { TermSchema } from '@/terms/infrastructure/term.schema';
import {
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @JoinColumn({ name: 'adopter' })
  @ManyToOne(() => AdopterSchema, adopter => adopter.animals, {
    nullable: true,
  })
  adopter: AdopterSchema;

  @OneToMany(() => TermSchema, term => term.animal, {
    nullable: true,
  })
  terms: TermSchema[];

  @Column({ name: 'type' })  //ENUM
  type: string;

  @Column({ name: 'size' })  //ENUM
  size: string;

  @Column({ name: 'gender' }) //ENUM
  gender: string;

  // photos
  //historicOfProcedures
  //father AUTORELACIONAMENTO
  //mother AUTORELACIONAMENTO
  //documents
  //expenses
}

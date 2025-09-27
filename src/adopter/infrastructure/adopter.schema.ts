import { AdopterAddressSchema } from '@/adopter-address/infrastructure/adopter-address.schema';
import { AdopterContactSchema } from '@/adopter-contact/infrastructure/adopter-contact.schema';
import { AnimalSchema } from '@/animals/infrastructure/animal.schema';
import { UserAuditableSchema } from '@/shared/infrastructure/auditable/user-auditable.schema';
import { TermSchema } from '@/terms/infrastructure/term.schema';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adopter')
export class AdopterSchema extends UserAuditableSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'dtOfBirth' })
  dtOfBirth: Date;

  @Column({ name: 'rg' })
  rg: string;

  @Column({ name: 'cpf', unique: true, length: 14 })
  cpf: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'profession' })
  profession: string;

  @Column({ name: 'civilState' })
  civilState: string;

  @Column({ name: 'activeNotification' })
  activeNotification: boolean;

  @Column({ name: 'dtToNotify', nullable: true })
  dtToNotify: Date;

  @OneToMany(() => AdopterAddressSchema, address => address.adopter, {
    cascade: true,
    eager: false,
    onDelete: 'CASCADE',
  })
  addresses: AdopterAddressSchema[];

  @OneToMany(() => AdopterContactSchema, contact => contact.adopter, {
    cascade: true,
    eager: false,
    onDelete: 'CASCADE',
  })
  contacts: AdopterContactSchema[];

  @OneToMany(() => TermSchema, term => term.adopter, {
    nullable: true,
    cascade: false,
  })
  terms: TermSchema[];

  @OneToMany(() => AnimalSchema, animal => animal.adopter, {
    nullable: true,
    cascade: false,
  })
  animals: AnimalSchema[];
}

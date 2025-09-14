import { AdopterAddressSchema } from '@/adopter-address/infrastructure/adopter-adress.schema';
import { AdopterContactSchema } from '@/adopter-contacts/infrastructure/adopter-contact.schema';
import { AnimalSchema } from '@/animals/infrastructure/animal.schema';
import { UserAuditableSchema } from '@/shared/infrastructure/auditable/user-auditable.schema';
import { TermSchema } from '@/terms/infrastructure/term.schema';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adopters')
export class AdopterSchema extends UserAuditableSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'dtOfBirth' })
  dtOfBirth: Date;

  @Column({ name: 'rg' })
  rg: string;

  @Column({ name: 'cpf', unique: true })
  cpf: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'profession' })
  profession: string;

  @Column({ name: 'civilState' }) //ENUM
  civilState: string;

  @Column({ name: 'activeNotification' })
  activeNotification: boolean;

  @Column({ name: 'dtToNotify' })
  dtToNotify: Date;

  @OneToMany(() => AdopterAddressSchema, address => address.adopter)
  addresses: AdopterAddressSchema[];

  @OneToMany(() => AdopterContactSchema, contact => contact.adopter)
  contacts: AdopterContactSchema[];

  @OneToMany(() => TermSchema, term => term.adopter, {
    nullable: true,
  })
  terms: TermSchema[];

  @OneToMany(() => AnimalSchema, animal => animal.adopter, {
    nullable: true,
  })
  animals: AnimalSchema[];
}

import { AdopterSchema } from '@/adopter/infrastructure/adopter.schema';
import { AnimalSchema } from '@/animals/infrastructure/animal.schema';
import { UserAuditableSchema } from '@/shared/infrastructure/auditable/user-auditable.schema';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('term')
export class TermSchema extends UserAuditableSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'adopter_id' })
  @ManyToOne(() => AdopterSchema, adopter => adopter.terms)
  adopter: AdopterSchema;

  @JoinColumn({ name: 'animal_id' })
  @ManyToOne(() => AnimalSchema, animal => animal.terms)
  animal: AnimalSchema;
}

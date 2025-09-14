import { AdopterSchema } from '@/adopter/infrastructure/adopter.schema';
import { AuditableSchema } from '@/shared/infrastructure/auditable/auditable-schema';
import { CreatedAtAuditableSchema } from '@/shared/infrastructure/auditable/created-at-auditable-schema';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adopter_contact')
export class AdopterContactSchema extends CreatedAtAuditableSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'value' })
  value: string;

  @Column({ name: 'isPrincipal' })
  isPrincipal: boolean;

  @Column({ name: 'typeOfContact' })
  typeOfContact: string;

  @JoinColumn({ name: 'adopter' })
  @ManyToOne(() => AdopterSchema, adopter => adopter.contacts)
  adopter: AdopterSchema;
}

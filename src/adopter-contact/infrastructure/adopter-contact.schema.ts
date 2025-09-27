import { AdopterSchema } from '@/adopter/infrastructure/adopter.schema';
import { CreatedAtAuditableSchema } from '@/shared/infrastructure/auditable/created-at-auditable-schema';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('adopter_contact')
export class AdopterContactSchema extends CreatedAtAuditableSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'value' })
  value: string;

  @Column({ name: 'isPrincipal' })
  isPrincipal: boolean;

  @Column({ name: 'type' })
  type: string;

  @JoinColumn({ name: 'adopter_id' })
  @ManyToOne(() => AdopterSchema, adopter => adopter.contacts, {
    onDelete: 'CASCADE',
  })
  adopter: AdopterSchema;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt?: Date;
}

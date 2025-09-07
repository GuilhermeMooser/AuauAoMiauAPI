import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { AuditableSchema } from './auditable-schema';

export abstract class UserAuditableSchema extends AuditableSchema {
  @Column({ name: 'createdByUserId', nullable: true })
  createdByUserId: string;

  @Column({ name: 'updatedByUserId', nullable: true })
  updatedByUserId: string;

  @Column({ name: 'deletedByUserId', nullable: true })
  deletedByUserId: string;
}

import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { AuditableSchema } from './auditable-schema';

export abstract class UserAuditableSchema extends AuditableSchema {
  @Column({ name: 'createdByUserId', nullable: true })
  createdByUserId: number;

  @Column({ name: 'updatedByUserId', nullable: true })
  updatedByUserId: number;

  @Column({ name: 'deletedByUserId', nullable: true })
  deletedByUserId: number;
}

import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AuditableSchema {
  @CreateDateColumn({ name: 'createdAt' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt?: Date;
}

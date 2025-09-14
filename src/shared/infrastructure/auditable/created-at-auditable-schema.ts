import { CreateDateColumn } from 'typeorm';

export abstract class CreatedAtAuditableSchema {
  @CreateDateColumn({ name: 'createdAt' })
  createdAt?: Date;
}

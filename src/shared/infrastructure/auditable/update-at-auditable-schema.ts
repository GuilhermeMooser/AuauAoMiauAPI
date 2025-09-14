import { UpdateDateColumn } from 'typeorm';

export abstract class UpdatedAtAuditableSchema {

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt?: Date;
}

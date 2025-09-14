import { DeleteDateColumn } from 'typeorm';

export abstract class DeleteAtAuditableSchema {
  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt?: Date;
}

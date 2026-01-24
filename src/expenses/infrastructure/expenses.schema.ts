import { AnimalSchema } from '@/animals/infrastructure/animal.schema';
import { ExpenseAttachmentSchema } from '@/expense-attachment/infrastructure/expense-attachment.schema';
import { AnimalProcedureSchema } from '@/procedures/animal-procedures/infrastructure/animal-procedures.schema';
import { CreatedAtAuditableSchema } from '@/shared/infrastructure/auditable/created-at-auditable-schema';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('expenses')
export class ExpensesSchema extends CreatedAtAuditableSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AnimalSchema)
  @JoinColumn({ name: 'animal_id' })
  animal: AnimalSchema;

  @ManyToOne(() => AnimalProcedureSchema, { nullable: true })
  @JoinColumn({ name: 'animal_procedure_id' })
  animalProcedure: AnimalProcedureSchema;

  @Column({ name: 'expenseType' })
  expenseType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ name: 'description', length: 400 })
  description: string;

  @Column({ name: 'paymentType', nullable: true })
  paymentType: string;

  @OneToMany(
    () => ExpenseAttachmentSchema,
    expenseAttachment => expenseAttachment.expense,
    { nullable: true },
  )
  expenseAttachment: ExpenseAttachmentSchema[];
}

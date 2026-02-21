import { ExpensesSchema } from '@/expenses/infrastructure/expenses.schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('expense_attachment')
export class ExpenseAttachmentSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'fileType' })
  fileType: string;

  @Column({ name: 'filePath' })
  filePath: string;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Column({ name: 'fileSize', nullable: true })
  fileSize: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ExpensesSchema, expense => expense.expenseAttachment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'expense_id' })
  expense: ExpensesSchema;
}

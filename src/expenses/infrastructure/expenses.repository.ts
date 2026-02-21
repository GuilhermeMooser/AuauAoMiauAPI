import { InjectRepository } from '@nestjs/typeorm';
import { ExpensesRepository } from '../domain/expenses.repository';
import { Repository } from 'typeorm';
import { ExpensesSchema } from './expenses.schema';
import { Expenses } from '../domain/expenses.entity';
import { Injectable } from '@nestjs/common';
import { ExpenseMapper } from './mapper/expense.mapper';

@Injectable()
export class ExpensesRepositoryImpl implements ExpensesRepository {
  constructor(
    @InjectRepository(ExpensesSchema)
    private readonly expensesRepository: Repository<ExpensesSchema>,
  ) {}

  async findById(id: string): Promise<Expenses> {
    const expense = await this.expensesRepository.findOne({
      where: { id },
      relations: ['expenseAttachment'],
    });

    return ExpenseMapper.instance.toEntity(expense);
  }

  async create(entity: Expenses): Promise<Expenses> {
    const expense = await this.expensesRepository.save(entity);
    return ExpenseMapper.instance.toEntity(expense);
  }

  async update(entity: Expenses): Promise<Expenses> {
    const expense = await this.expensesRepository.save(entity);
    return ExpenseMapper.instance.toEntity(expense);
  }

  softDeleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  softDeleteByUserId(id: string, userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async softDeleteAllByIds(ids: string[], userId: string): Promise<void> {
    await this.expensesRepository
      .createQueryBuilder()
      .update()
      .set({
        deletedByUserId: userId,
        deletedAt: () => 'CURRENT_TIMESTAMP',
      })
      .whereInIds(ids)
      .execute();
  }
}

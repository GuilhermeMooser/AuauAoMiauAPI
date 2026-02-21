import { InjectRepository } from '@nestjs/typeorm';
import { ExpensesRepository } from '../domain/expenses.repository';
import { Repository } from 'typeorm';
import { ExpensesSchema } from './expenses.schema';
import { Expenses } from '../domain/expenses.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpensesRepositoryImpl implements ExpensesRepository {
  constructor(
    @InjectRepository(ExpensesSchema)
    private readonly expensesRepository: Repository<ExpensesSchema>,
  ) {}

  findById(id: string): Promise<Expenses> {
    // const expense = await this.expensesRepository.findOne({
    //   where: { id },
    //   relations: ['expenseAttachment'],
    // });

    // return expense;
    return null;
  }
  create(entity: Partial<Expenses>): Promise<Expenses> {
    throw new Error('Method not implemented.');
  }
  update(entity: Partial<Expenses>): Promise<Expenses> {
    throw new Error('Method not implemented.');
  }
  softDeleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  softDeleteByUserId(id: string, userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async softDeleteAllByIds(ids: string[], userId: string): Promise<void> {
    // await this.expensesRepository
    //   .createQueryBuilder()
    //   .update()
    //   .set({
    //     deletedByUserId: userId,
    //     deletedAt: () => 'CURRENT_TIMESTAMP',
    //   })
    //   .whereInIds(ids)
    //   .execute();
  }
}

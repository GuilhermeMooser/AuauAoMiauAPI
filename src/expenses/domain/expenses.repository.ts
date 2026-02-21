import { Repository } from '@/shared/domain/repositories/repository';
import { Expenses } from './expenses.entity';

export interface ExpensesRepository extends Repository<Expenses> {
  softDeleteAllByIds(ids: string[], userId: string): Promise<void>;
}

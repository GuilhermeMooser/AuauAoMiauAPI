import { Repository } from '@/shared/domain/repositories/repository';
import { Term } from './term.entity';

export interface TermRepository extends Repository<Term> {
  findAllByIds(ids: string[]): Promise<Term[]>;
}

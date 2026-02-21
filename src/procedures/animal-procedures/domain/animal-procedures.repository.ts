import { Repository } from '@/shared/domain/repositories/repository';
import { AnimalProcedures } from './animal-procedures.entity';

export interface AnimalProceduresRepository
  extends Repository<AnimalProcedures> {
  softDeleteAllByIds(ids: string[], userId: string): Promise<void>;
}

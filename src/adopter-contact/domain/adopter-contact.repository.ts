import { SoftDeleteRepository } from '@/shared/domain/repositories/repository';

export interface AdopterContactRepository extends SoftDeleteRepository {
  removeAllByIds(ids: string[]);
}

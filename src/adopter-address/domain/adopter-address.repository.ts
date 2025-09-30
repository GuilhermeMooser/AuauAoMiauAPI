import { SoftDeleteRepository } from '@/shared/domain/repositories/repository';

export interface AdopterAddressRepository extends SoftDeleteRepository {
  removeAllByIds(ids: string[]);
}

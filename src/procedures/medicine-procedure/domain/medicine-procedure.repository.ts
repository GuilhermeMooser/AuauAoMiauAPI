import {
  CreateRepository,
  UpdateRepository,
} from '@/shared/domain/repositories/repository';
import { MedicineProcedure } from './medicine-procedure.entity';

export interface MedicineProcedureRepository
  extends CreateRepository<MedicineProcedure>,
    UpdateRepository<MedicineProcedure> {}

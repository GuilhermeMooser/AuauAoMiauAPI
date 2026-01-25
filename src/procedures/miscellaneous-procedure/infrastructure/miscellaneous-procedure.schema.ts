import {
  AnimalProcedureEnum,
  AnimalProcedureSchema,
} from '@/procedures/animal-procedures/infrastructure/animal-procedures.schema';
import { ChildEntity } from 'typeorm';

@ChildEntity(AnimalProcedureEnum.MISCELLANEOUS)
export abstract class MiscellaneousProcedureSchema extends AnimalProcedureSchema {}

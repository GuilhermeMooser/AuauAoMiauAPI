import {
  AnimalProcedureEnum,
  AnimalProcedureSchema,
} from '@/procedures/animal-procedures/infrastructure/animal-procedures.schema';
import { ChildEntity } from 'typeorm';

@ChildEntity(AnimalProcedureEnum.SURGERY)
export abstract class SurgeryProcedureSchema extends AnimalProcedureSchema {}

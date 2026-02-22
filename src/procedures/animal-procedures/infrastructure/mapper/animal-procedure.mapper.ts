import { RepositoryBaseMapper } from '@/shared/domain/repositories/repository-base-mapper';
import { AnimalProcedures } from '../../domain/animal-procedures.entity';
import { AnimalProcedureSchema } from '../animal-procedures.schema';
import { ExpenseMapper } from '@/expenses/infrastructure/mapper/expense.mapper';
import { AnimalMapper } from '@/animals/infrastructure/mapper/animal.mapper';

export class AnimalProcedureMapper extends RepositoryBaseMapper<
  AnimalProcedureSchema,
  AnimalProcedures
> {
  private static _instance: AnimalProcedureMapper;

  static get instance(): AnimalProcedureMapper {
    if (!this._instance) {
      this._instance = new AnimalProcedureMapper();
    }
    return this._instance;
  }

  toEntity(schema: AnimalProcedureSchema): AnimalProcedures {
    if (!schema) return null;

    return new AnimalProcedures({
      id: schema.id,
      animal: schema.animal
        ? AnimalMapper.instance.toEntity(schema.animal)
        : undefined,
      dtOfProcedure: schema.dtOfProcedure,
      description: schema.description,
      veterinarian: schema.veterinarian,
      observation: schema.observation,
      expenses:
        schema.expenses && schema.expenses.length > 0
          ? ExpenseMapper.instance.toEntityMany(schema.expenses)
          : null,
      procedureType: schema.procedureType,
      medicineName: schema.medicineName,
      reason: schema.reason,
      dosage: schema.dosage,
      frequency: schema.frequency,
      dtOfStart: schema.dtOfStart,
      dtOfEnd: schema.dtOfEnd,
      recomendations: schema.recomendations,
      surgeryName: schema.surgeryName,
      surgeryType: schema.surgeryType,
      local: schema.local,
      dtOfDuration: schema.dtOfDuration,
      vaccineName: schema.vaccineName,
      vaccineType: schema.vaccineType,
      batch: schema.batch,
      manufacturer: schema.manufacturer,
      dtOfExpiration: schema.dtOfExpiration,
      audit: {
        createdAt: schema.createdAt,
        deletedAt: schema.deletedAt,
        updatedAt: schema.updatedAt,
      },
      createdByUserId: schema.createdByUserId,
      deletedByUserId: schema.deletedByUserId,
      updatedByUserId: schema.updatedByUserId,
    });
  }
}

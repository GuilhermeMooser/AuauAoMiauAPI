import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { AnimalProcedures } from '../../domain/animal-procedures.entity';
import { Injectable } from '@nestjs/common';
import { AnimalProcedureEnum } from '../../infrastructure/animal-procedures.schema';
import {
  MinimalExpensesOutput,
  MinimalExpensesOutputMapper,
} from '@/expenses/application/output/minimal-expenses-output';

export type AnimalProcedureOutput = {
  id: string;
  description: string;
  procedureType: AnimalProcedureEnum;
  //Optional
  dtOfProcedure?: Date;
  veterinarian?: string;
  observation?: string;
  expenses?: MinimalExpensesOutput[];
  // Daughter
  medicineName?: string;
  reason?: string;
  dosage?: string;
  frequency?: string;
  dtOfStart?: Date;
  dtOfEnd?: Date;
  recomendations?: string;
  surgeryName?: string;
  surgeryType?: string;
  local?: string;
  dtOfDuration?: Date;
  vaccineName?: string;
  vaccineType?: string;
  batch?: string;
  manufacturer?: string;
  dtOfExpiration?: Date;
};

@Injectable()
export class AnimalProcedureOutputMapper extends OutputMapper<
  AnimalProcedures,
  AnimalProcedureOutput
> {
  constructor(
    private readonly minimalExpensesMapper: MinimalExpensesOutputMapper,
  ) {
    super();
  }

  toOutput(entity: AnimalProcedures): AnimalProcedureOutput {
    return {
      id: entity.id,
      description: entity.props.description,
      procedureType: entity.props.procedureType,
      //Optional
      dtOfProcedure: entity.props.dtOfProcedure,
      veterinarian: entity.props.veterinarian,
      observation: entity.props.observation,
      expenses: this.toOutputArray(
        entity.props.expenses,
        this.minimalExpensesMapper,
      ),
      //Daughter
      medicineName: entity.props.medicineName,
      reason: entity.props.reason,
      dosage: entity.props.dosage,
      frequency: entity.props.frequency,
      dtOfStart: entity.props.dtOfStart,
      dtOfEnd: entity.props.dtOfEnd,
      recomendations: entity.props.recomendations,
      surgeryName: entity.props.surgeryName,
      surgeryType: entity.props.surgeryType,
      local: entity.props.local,
      dtOfDuration: entity.props.dtOfDuration,
      vaccineName: entity.props.vaccineName,
      vaccineType: entity.props.vaccineType,
      batch: entity.props.batch,
      manufacturer: entity.props.manufacturer,
      dtOfExpiration: entity.props.dtOfExpiration,
    };
  }
}

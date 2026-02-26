import { MinimalExpensePresenter } from "@/expenses/infrastructure/presenters/minimal-expense.presenter";
import { AnimalProcedureEnum } from "../animal-procedures.schema";
import type { Audit } from "@/shared/domain/entity";
import { ApiProperty } from "@nestjs/swagger";

export class AnimalProcedurePresenter {

  @ApiProperty({ description: 'Id' })
  id: string;

  @ApiProperty({ description: 'Description' })
  description: string;

  @ApiProperty({ description: 'Procedure type' })
  procedureType: AnimalProcedureEnum;

  @ApiProperty({ description: 'Date of procedure' })
  dtOfProcedure?: Date;

  @ApiProperty({ description: 'Veterinarian' })
  veterinarian?: string;

  @ApiProperty({ description: 'Observation' })
  observation?: string;

  @ApiProperty({ description: 'Expenses' })
  expenses?: MinimalExpensePresenter[

  ];
  @ApiProperty({ description: 'Medicine name' })
  medicineName?: string;

  @ApiProperty({ description: 'Reason' })
  reason?: string;

  @ApiProperty({ description: 'Dosage' })
  dosage?: string;

  @ApiProperty({ description: 'Frequency' })
  frequency?: string;

  @ApiProperty({ description: 'Date of start' })
  dtOfStart?: Date;

  @ApiProperty({ description: 'Date of end' })
  dtOfEnd?: Date;

  @ApiProperty({ description: 'Recomendations' })
  recomendations?: string;

  @ApiProperty({ description: 'Surgery name' })
  surgeryName?: string;

  @ApiProperty({ description: 'Surgery type' })
  surgeryType?: string;

  @ApiProperty({ description: 'Local' })
  local?: string;

  @ApiProperty({ description: 'Date of duration' })
  dtOfDuration?: Date;

  @ApiProperty({ description: 'Vaccine name' })
  vaccineName?: string;

  @ApiProperty({ description: 'Vaccine type' })
  vaccineType?: string;

  @ApiProperty({ description: 'Batch' })
  batch?: string;

  @ApiProperty({ description: 'Manufacturer' })
  manufacturer?: string;

  @ApiProperty({ description: 'Date of expiration' })
  dtOfExpiration?: Date;

  @ApiProperty({ description: 'Audit' })
  audit: Audit;
}
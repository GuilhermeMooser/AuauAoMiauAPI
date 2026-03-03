import { AdopterPresenter } from '@/adopter/infrastructure/presenters/adopter.presenter';
import { MinimalAdopterPresenter } from '@/adopter/infrastructure/presenters/minimal-adopter.presenter';
import { AnimalTypePresenter } from '@/animal-type/infrastructure/presenter/animal-type.presenter';
import { MinimalExpensePresenter } from '@/expenses/infrastructure/presenters/minimal-expense.presenter';
import { AnimalProcedurePresenter } from '@/procedures/animal-procedures/infrastructure/presenters/animal-procedure.presenter';
import type { Audit } from '@/shared/domain/entity';
import { TermPresenter } from '@/terms/infrastructure/presenters/term.presenter';
import { ApiProperty } from '@nestjs/swagger';

export class AnimalPresenter {
  @ApiProperty({ description: 'ID' })
  id: string;

  @ApiProperty({ description: 'Name' })
  name: string;

  @ApiProperty({ description: 'Age' })
  age: number;

  @ApiProperty({ description: 'breed' })
  breed: string;

  @ApiProperty({ description: 'color' })
  color: string;

  @ApiProperty({ description: 'dtOfBirth' })
  dtOfBirth?: Date;

  @ApiProperty({ description: 'dtOfDeath' })
  dtOfDeath?: Date;

  @ApiProperty({ description: 'dtOfRescue' })
  dtOfRescue?: Date;

  @ApiProperty({ description: 'dtOfAdoption' })
  dtOfAdoption?: Date;

  @ApiProperty({ description: 'locationOfRescue' })
  locationOfRescue?: string;

  @ApiProperty({ description: 'adopter' })
  adopter?: MinimalAdopterPresenter;

  @ApiProperty({ description: 'type' })
  type: AnimalTypePresenter;

  @ApiProperty({ description: 'size' })
  size: string;

  @ApiProperty({ description: 'gender' })
  gender: string;

  @ApiProperty({ description: 'additionalInfo' })
  additionalInfo?: string;

  @ApiProperty({ description: 'castrated' })
  castrated?: boolean;

  @ApiProperty({ description: 'expenses' })
  expenses?: MinimalExpensePresenter[];

  @ApiProperty({ description: 'animalProcedures' })
  animalProcedures?: AnimalProcedurePresenter[];

  @ApiProperty({ description: 'terms' })
  terms?: TermPresenter[];

  @ApiProperty({ description: 'audit' })
  audit: Audit;
}

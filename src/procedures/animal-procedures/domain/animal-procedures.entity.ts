import { Animal } from '@/animals/domain/animal.entity';
import { Expenses } from '@/expenses/domain/expenses.entity';
import { UserAuditableEntity } from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';
import { AnimalProcedureEnum } from '../infrastructure/animal-procedures.schema';

export type AnimalProceduresProps = {
  animal: Animal;
  dtOfProcedure?: Date;
  description: string;
  veterinarian?: string;
  observation?: string;
  expenses?: Expenses[];
  procedureType: AnimalProcedureEnum,
  //Daughter
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

export class AnimalProcedures extends UserAuditableEntity<AnimalProceduresProps> {
  constructor(
    props: AnimalProceduresProps & {
      id?: string;
      audit?: Partial<Audit>;
      createdByUserId?: string;
      updatedByUserId?: string;
      deletedByUserId?: string;
    },
  ) {
    super(props);
  }

  get animal() {
    return this.props.animal;
  }

  get dtOfProcedure() {
    return this.props.dtOfProcedure;
  }

  get description() {
    return this.props.description;
  }

  get veterinarian() {
    return this.props.veterinarian;
  }

  get observation() {
    return this.props.observation;
  }

  get expenses() {
    return this.props.expenses;
  }

  static create(
    props: AnimalProceduresProps & {
      createdByUserId?: string;
    },
  ): AnimalProcedures {
    return new AnimalProcedures({
      ...props,
      createdByUserId: props.createdByUserId,
      audit: {
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    });
  }
}

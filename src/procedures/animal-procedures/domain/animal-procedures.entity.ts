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
  procedureType: AnimalProcedureEnum;
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

  get id() {
    return this.props.id;
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

  update(
    props: Partial<AnimalProceduresProps> & {
      updatedByUserId?: string;
    },
  ): void {
    if (props.animal !== undefined) {
      this.props.animal = props.animal;
    }

    if (props.description !== undefined) {
      this.props.description = props.description;
    }

    if (props.procedureType !== undefined) {
      this.props.procedureType = props.procedureType;
    }

    this.props.dtOfProcedure = props?.dtOfProcedure ?? null;
    this.props.veterinarian = props?.veterinarian ?? null;
    this.props.observation = props?.observation ?? null;
    this.props.medicineName = props?.medicineName ?? null;
    this.props.reason = props?.reason ?? null;
    this.props.dosage = props?.dosage ?? null;
    this.props.frequency = props?.frequency ?? null;
    this.props.dtOfStart = props?.dtOfStart ?? null;
    this.props.dtOfEnd = props?.dtOfEnd ?? null;
    this.props.recomendations = props?.recomendations ?? null;
    this.props.surgeryName = props?.surgeryName ?? null;
    this.props.surgeryType = props?.surgeryType ?? null;
    this.props.local = props?.local ?? null;
    this.props.dtOfDuration = props?.dtOfDuration ?? null;
    this.props.vaccineName = props?.vaccineName ?? null;
    this.props.vaccineType = props?.vaccineType ?? null;
    this.props.batch = props?.batch ?? null;
    this.props.manufacturer = props?.manufacturer ?? null;
    this.props.dtOfExpiration = props?.dtOfExpiration ?? null;
    this.props.updatedByUserId = props?.updatedByUserId ?? null;
  }
}

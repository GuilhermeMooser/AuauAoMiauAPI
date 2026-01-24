import { Animal } from "@/animals/domain/animal.entity";
import { Expenses } from "@/expenses/domain/expenses.entity";
import { UserAuditableEntity } from "@/shared/domain/auditable.entity";
import { Audit } from "@/shared/domain/entity";

export type AnimalProceduresProps = {
  animal: Animal;
  dtOfProcedure?: Date;
  description: string;
  veterinarian?: string;
  observation?: string;
  expenses?: Expenses[]
}

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
}
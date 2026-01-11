import { AuditableEntity } from "@/shared/domain/auditable.entity";
import { Audit } from "@/shared/domain/entity";

type ExpensesProps = {

}

export class Expenses extends AuditableEntity<ExpensesProps> {
  constructor(
    props: ExpensesProps & {
      id?: string;
      audit?: Partial<Audit>;
    }
  ) {
    super(props)
  }
}


import { UserAuditableEntity } from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';

type TermProps = {
  teste: string; //AJUSTAR
};

export class Term extends UserAuditableEntity<TermProps> {
  constructor(
    props: TermProps & {
      id?: string;
      audit?: Partial<Audit>;
      createdByUserId?: string;
      updatedByUserId?: string;
      deletedByUserId?: string;
    },
  ) {
    super(props);
  }
}

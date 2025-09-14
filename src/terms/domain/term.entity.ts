import { Adopter } from '@/adopter/domain/adopter.entity';
import { Animal } from '@/animals/domain/animal.entity';
import { UserAuditableEntity } from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';

type TermProps = {
  adopter: Adopter;
  animal: Animal;
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

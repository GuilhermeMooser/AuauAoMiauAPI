import { Adopter } from '@/adopter/domain/adopter.entity';
import { UserAuditableEntity } from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';
import { Term } from '@/terms/domain/term.entity';

type AnimalProps = {
  name: string;
  age: number;
  breed: string;
  color: string;
  dtOfBirth?: Date;
  dtOfDeath?: Date;
  dtOfRescue?: Date;
  dtOfAdoption?: Date;
  locationOfRescue?: string;
  adopter?: Adopter;
  terms?: Term[];
  type: string; //CAT, DOG, OTHER -> bgl inteligente de cadastrar
  size: string; //enum
  gender: string; //enum
  additionalInfo?: string;
  // castrated: boolean;
  // animalProcedures?: AnimalProcedures[];
  // animalPhotos: AnimalPhotos[]
  // animalExpenses?: AnimalExpenses;
};

export class Animal extends UserAuditableEntity<AnimalProps> {
  constructor(
    props: AnimalProps & {
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

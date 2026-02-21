import { Adopter } from '@/adopter/domain/adopter.entity';
import { AnimalType } from '@/animal-type/domain/animal-type.entity';
import { Expenses } from '@/expenses/domain/expenses.entity';
import { AnimalProcedures } from '@/procedures/animal-procedures/domain/animal-procedures.entity';
import { UserAuditableEntity } from '@/shared/domain/auditable.entity';
import { Audit } from '@/shared/domain/entity';
import { Term } from '@/terms/domain/term.entity';

export type AnimalSize = 'pequeno' | 'médio' | 'grande';

export type AnimalGender = 'M' | 'F';

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
  type: AnimalType;
  size: string;
  gender: string;
  additionalInfo?: string;
  castrated?: boolean;
  expenses?: Expenses[];
  animalProcedures?: AnimalProcedures[];

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

  static create(
    props: AnimalProps & {
      createdByUserId?: string;
    },
  ): Animal {
    return new Animal({
      ...props,
      createdByUserId: props.createdByUserId,
      audit: {
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    });
  }

  updateAnimalProcedure(animalProcedures: AnimalProcedures[]): this {
    if (animalProcedures !== undefined && animalProcedures.length > 0) {
      this.props.animalProcedures = animalProcedures;
    }
    return this;
  }
}
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

  update(
    props: Partial<AnimalProps> & {
      updatedByUserId?: string;
    },
  ) {
    if (props.name !== undefined) {
      this.props.name = props.name;
    }

    if (props.age !== undefined) {
      this.props.age = props.age;
    }

    if (props.breed !== undefined) {
      this.props.breed = props.breed;
    }

    if (props.type !== undefined) {
      this.props.type = props.type;
    }

    if (props.size !== undefined) {
      this.props.size = props.size;
    }

    if (props.gender !== undefined) {
      this.props.gender = props.gender;
    }

    this.props.dtOfBirth = props?.dtOfBirth ?? null;
    this.props.dtOfDeath = props?.dtOfDeath ?? null;
    this.props.dtOfRescue = props?.dtOfRescue ?? null;
    this.props.dtOfAdoption = props?.dtOfAdoption ?? null;
    this.props.locationOfRescue = props?.locationOfRescue ?? null;
    this.props.adopter = props?.adopter ?? null;
    this.props.additionalInfo = props?.additionalInfo ?? null;
    this.props.castrated = props?.castrated ?? null;
    this.props.updatedByUserId = props.updatedByUserId;
  }
}

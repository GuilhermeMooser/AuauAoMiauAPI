import { AnimalTypePresenter } from '@/animal-type/infrastructure/presenter/animal-type.presenter';
import type { Audit } from '@/shared/domain/entity';
import { ApiProperty } from '@nestjs/swagger';

export class MinimalAnimalPresenter {
  @ApiProperty({ description: 'ID' })
  id: string;

  @ApiProperty({ description: 'Name' })
  name: string;

  @ApiProperty({ description: 'Age' })
  age: number;

  @ApiProperty({ description: 'Breed' })
  breed: string;

  @ApiProperty({ description: 'Date of rescue' })
  dtOfRescue?: Date;

  @ApiProperty({ description: 'Date of death' })
  dtOfDeath?: Date;

  @ApiProperty({ description: 'Date of adoption' })
  dtOfAdoption?: Date;

  @ApiProperty({ description: 'Animal type' })
  type?: AnimalTypePresenter;

  @ApiProperty({ description: 'Gender' })
  gender: string;

  @ApiProperty({ description: 'Castrated' })
  castrated?: boolean;

  @ApiProperty({ description: 'Auditable' })
  audit?: Audit;
}

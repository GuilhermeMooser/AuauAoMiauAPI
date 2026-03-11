import { MinimalAdopterPresenter } from '@/adopter/infrastructure/presenters/minimal-adopter.presenter';
import { MinimalAnimalPresenter } from '@/animals/infrastructure/presenters/minimal-animal.presenter';
import type { Audit } from '@/shared/domain/entity';
import { ApiProperty } from '@nestjs/swagger';

export class TermPresenter {
  @ApiProperty({ description: 'ID' })
  id: string;

  @ApiProperty({ description: 'Animal associated to term' })
  animal: MinimalAnimalPresenter;

  @ApiProperty({ description: 'adopter associated to term' })
  adopter: MinimalAdopterPresenter;

  @ApiProperty({ description: 'Auditable' })
  audit?: Audit;
}

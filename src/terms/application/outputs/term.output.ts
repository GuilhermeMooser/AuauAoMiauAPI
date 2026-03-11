import {
  MinimalAdopterOutput,
  MinimalAdopterOutputMapper,
} from '@/adopter/application/outputs/minimal-adopter.output';
import {
  MinimalAnimalOutput,
  MinimalAnimalOutputMapper,
} from '@/animals/application/outputs/minimal-animal.output';
import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { Term } from '@/terms/domain/term.entity';
import { Injectable } from '@nestjs/common';

export type TermOutput = {
  id: string;
  animal: MinimalAnimalOutput;
  adopter: MinimalAdopterOutput;
};

@Injectable()
export class TermOutputMapper extends OutputMapper<Term, TermOutput> {
  constructor(
    private readonly adopterMapper: MinimalAdopterOutputMapper,
    private readonly animalMapper: MinimalAnimalOutputMapper,
  ) {
    super();
  }

  toOutput(entity: Term): TermOutput {
    return {
      id: entity.id,
      animal: this.animalMapper.toOutput(entity.props.animal),
      adopter: this.adopterMapper.toOutput(entity.props.adopter),
    };
  }
}

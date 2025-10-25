import { Animal } from '@/animals/domain/animal.entity';
import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { Injectable } from '@nestjs/common';

export type AnimalOutput = {};
@Injectable()
export class AnimalOutputMapper extends OutputMapper<Animal, AnimalOutput> {
  toOutput(entity: Animal): AnimalOutput {
    return {};
  }
}

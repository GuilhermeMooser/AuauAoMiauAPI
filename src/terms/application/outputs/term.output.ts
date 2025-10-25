import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { Term } from '@/terms/domain/term.entity';
import { Injectable } from '@nestjs/common';

export type TermOutput = {};
@Injectable()
export class TermOutputMapper extends OutputMapper<Term, TermOutput> {
  toOutput(entity: Term): TermOutput {
    return {};
  }
}

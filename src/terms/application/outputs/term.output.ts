import { OutputMapper } from '@/shared/application/outputs/output-mapper';
import { Term } from '@/terms/domain/term.entity';

export type TermOutput = {};
export class TermOutputMapper extends OutputMapper<Term, TermOutput> {}

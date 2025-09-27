import { RepositoryBaseMapper } from '@/shared/domain/repositories/repository-base-mapper';
import { TermSchema } from '../term.schema';
import { Term } from '@/terms/domain/term.entity';

export class TermMapper extends RepositoryBaseMapper<TermSchema, Term> {
  private static _instance: TermMapper;

  static get instance(): TermMapper {
    if (!this._instance) {
      this._instance = new TermMapper();
    }
    return this._instance;
  }

  toEntity(schema: TermSchema): Term {
    throw new Error('Method not implemented.');
  }
}

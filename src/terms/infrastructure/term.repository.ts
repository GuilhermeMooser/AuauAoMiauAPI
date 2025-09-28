import { Injectable } from '@nestjs/common';
import { Term } from '../domain/term.entity';
import { TermRepository } from '../domain/term.repository';
import { TermMapper } from './mapper/term.mapper';
import { TermSchema } from './term.schema';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TermRepositoryImpl implements TermRepository {
  constructor(
    @InjectRepository(TermSchema)
    private readonly termRepository: Repository<TermSchema>,
  ) {}

  async findAllByIds(ids: string[]): Promise<Term[]> {
    const terms = await this.termRepository.find({
      where: { id: In(ids) },
    });

    return TermMapper.instance.toEntityMany(terms);
  }
  findById(id: string): Promise<Term> {
    throw new Error('Method not implemented.');
  }
  create(entity: Partial<Term>): Promise<Term> {
    throw new Error('Method not implemented.');
  }
  update(entity: Term): Promise<Term> {
    throw new Error('Method not implemented.');
  }
  softDeleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  softDeleteByUserId(id: string, userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

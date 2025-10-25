import { Module } from '@nestjs/common';
import { TermSchema } from './term.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermRepositoryImpl } from './term.repository';
import { TermOutputMapper } from '../application/outputs/term.output';

@Module({
  imports: [TypeOrmModule.forFeature([TermSchema])],
  providers: [
    TermOutputMapper,
    {
      provide: 'TermRepository',
      useClass: TermRepositoryImpl,
    },
  ],
  exports: ['TermRepository', TermOutputMapper],
})
export class TermModule {}

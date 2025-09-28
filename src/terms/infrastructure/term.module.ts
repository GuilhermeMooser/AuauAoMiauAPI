import { Module } from '@nestjs/common';
import { TermSchema } from './term.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermRepositoryImpl } from './term.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TermSchema])],
  providers: [
    {
      provide: 'TermRepository',
      useClass: TermRepositoryImpl,
    },
  ],
  exports: ['TermRepository'],
})
export class TermModule {}

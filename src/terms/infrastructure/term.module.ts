import { Module } from '@nestjs/common';
import { TermSchema } from './term.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermRepositoryImpl } from './term.repository';
import { TermOutputMapper } from '../application/outputs/term.output';
import { MapperModule } from '@/shared/infrastructure/global-mapper/global-mapper.module';

@Module({
  imports: [TypeOrmModule.forFeature([TermSchema]), MapperModule],
  providers: [
    {
      provide: 'TermRepository',
      useClass: TermRepositoryImpl,
    },
  ],
  exports: ['TermRepository'],
})
export class TermModule {}

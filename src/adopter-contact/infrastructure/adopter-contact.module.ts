import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdopterContactSchema } from './adopter-contact.schema';
import { AdopterContactRepositoryImpl } from './adopter-contact.repository';
import { AdopterContactOutputMapper } from '../application/outputs/adopter-contact.output';

@Module({
  imports: [TypeOrmModule.forFeature([AdopterContactSchema])],
  providers: [
    AdopterContactOutputMapper,
    {
      provide: 'AdopterContactRepository',
      useClass: AdopterContactRepositoryImpl,
    },
  ],
  exports: ['AdopterContactRepository', AdopterContactOutputMapper],
})
export class AdopterContactModule {}

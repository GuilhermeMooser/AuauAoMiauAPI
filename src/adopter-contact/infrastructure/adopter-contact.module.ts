import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdopterContactSchema } from './adopter-contact.schema';
import { AdopterContactRepositoryImpl } from './adopter-contact.repository';
import { AdopterContactOutputMapper } from '../application/outputs/adopter-contact.output';
import { MapperModule } from '@/shared/infrastructure/global-mapper/global-mapper.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdopterContactSchema]), MapperModule],
  providers: [
    {
      provide: 'AdopterContactRepository',
      useClass: AdopterContactRepositoryImpl,
    },
  ],
  exports: ['AdopterContactRepository'],
})
export class AdopterContactModule {}

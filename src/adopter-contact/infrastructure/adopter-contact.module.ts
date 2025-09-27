import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdopterContactSchema } from './adopter-contact.schema';
import { AdopterContactRepositoryImpl } from './adopter-contact.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdopterContactSchema])],
  providers: [
    {
      provide: 'AdopterContactRepository',
      useClass: AdopterContactRepositoryImpl,
    },
  ],
  exports: ['AdopterContactRepository'],
})
export class AdopterContactModule {}

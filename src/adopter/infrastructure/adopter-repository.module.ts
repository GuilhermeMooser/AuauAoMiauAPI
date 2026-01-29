import { Module } from '@nestjs/common';
import { AdopterSchema } from './adopter.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdopterRepositoryImpl } from './adopter.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdopterSchema])],
  providers: [
    {
      provide: 'AdopterRepository',
      useClass: AdopterRepositoryImpl,
    },
  ],
  exports: ['AdopterRepository'],
})
export class AdopterRepositoryModule {}

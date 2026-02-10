import { Module } from '@nestjs/common';
import { AdopterSchema } from './adopter.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdopterRepositoryImpl } from './adopter.repository';
import { MapperModule } from '@/shared/infrastructure/global-mapper/global-mapper.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdopterSchema]), MapperModule],
  providers: [
    {
      provide: 'AdopterRepository',
      useClass: AdopterRepositoryImpl,
    },
  ],
  exports: ['AdopterRepository'],
})
export class AdopterRepositoryModule {}

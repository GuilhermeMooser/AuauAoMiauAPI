import { Module } from '@nestjs/common';
import { AnimalSchema } from './animal.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalRepositoryImpl } from './animal.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalSchema])],
  providers: [
    {
      provide: 'AnimalRepository',
      useClass: AnimalRepositoryImpl,
    },
  ],
  exports: ['AnimalRepository'],
})
export class AnimalModule {}

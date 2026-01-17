import { Module } from '@nestjs/common';
import { AnimalSchema } from './animal.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalRepositoryImpl } from './animal.repository';
import { AnimalOutputMapper } from '../application/outputs/animal.output';
import { CreateAnimalUseCase } from '../application/create-animal.usecase';
import { AnimalController } from './animal.controller';
import { AdopterModule } from '@/adopter/infrastructure/adopter.module';
import { TermModule } from '@/terms/infrastructure/term.module';
import { AnimalTypeModule } from '@/animal-type/infrastructure/animal-type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnimalSchema]),
    AdopterModule,
    TermModule,
    AnimalTypeModule,
  ],
  controllers: [AnimalController],
  providers: [
    AnimalOutputMapper,
    CreateAnimalUseCase,
    {
      provide: 'AnimalRepository',
      useClass: AnimalRepositoryImpl,
    },
  ],
  exports: ['AnimalRepository', AnimalOutputMapper],
})
export class AnimalModule {}

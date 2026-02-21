import { Module } from '@nestjs/common';
import { AnimalSchema } from './animal.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalRepositoryImpl } from './animal.repository';
import { CreateAnimalUseCase } from '../application/create-animal.usecase';
import { AnimalController } from './animal.controller';
import { AdopterModule } from '@/adopter/infrastructure/adopter.module';
import { TermModule } from '@/terms/infrastructure/term.module';
import { AnimalTypeModule } from '@/animal-type/infrastructure/animal-type.module';
import { AdopterRepositoryModule } from '@/adopter/infrastructure/adopter-repository.module';
import { AnimalProcedureModule } from '@/procedures/animal-procedures/infrastructure/animal-procedures.module';
import { AnimalOutputMapper } from '../application/outputs/animal.output';
import { MapperModule } from '@/shared/infrastructure/global-mapper/global-mapper.module';
import { UpdateAnimalUseCase } from '../application/update-animal.usecase';
import { DeleteAnimalUseCase } from '../application/delete-animal.usecase';
import { FindAllAnimalsPaginatedUseCase } from '../application/find-all-animals-paginated.usecase';
import { FindAnimalByIdUseCase } from '../application/find-animal-by-id.usecase';
import { ExpensesModule } from '@/expenses/infrastructure/expenses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnimalSchema]),
    AdopterRepositoryModule,
    TermModule,
    AnimalTypeModule,
    AnimalProcedureModule,
    ExpensesModule, //vai quebrar isso
    MapperModule,
  ],
  controllers: [AnimalController],
  providers: [
    CreateAnimalUseCase,
    UpdateAnimalUseCase,
    DeleteAnimalUseCase,
    FindAllAnimalsPaginatedUseCase,
    FindAnimalByIdUseCase,
    {
      provide: 'AnimalRepository',
      useClass: AnimalRepositoryImpl,
    },
  ],
  exports: ['AnimalRepository'],
})
export class AnimalModule {}

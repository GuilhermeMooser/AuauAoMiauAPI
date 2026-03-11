import { Module } from '@nestjs/common';
import { TermSchema } from './term.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermRepositoryImpl } from './term.repository';
import { MapperModule } from '@/shared/infrastructure/global-mapper/global-mapper.module';
import { CreateTermUseCase } from '../application/create-term.usecase';
import { FindAllTermsPaginatedUseCase } from '../application/find-all-terms-paginated.usecase';
import { FindTermByIdTermUseCase } from '../application/find-term-by-id.usecase';
import { SoftDeleteTermUseCase } from '../application/soft-delete-term.usecase';
import { UpdateTermUseCase } from '../application/update-term.usecase';
import { TermController } from './term.controller';
import { AnimalRepositoryModule } from '@/animals/infrastructure/animal-repository.module';
import { AdopterRepositoryModule } from '@/adopter/infrastructure/adopter-repository.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TermSchema]),
    MapperModule,
    AnimalRepositoryModule,
    AdopterRepositoryModule,
  ],
  providers: [
    CreateTermUseCase,
    FindAllTermsPaginatedUseCase,
    FindTermByIdTermUseCase,
    SoftDeleteTermUseCase,
    UpdateTermUseCase,
    {
      provide: 'TermRepository',
      useClass: TermRepositoryImpl,
    },
  ],
  controllers: [TermController],
  exports: ['TermRepository'],
})
export class TermModule {}

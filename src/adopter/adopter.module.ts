import { Module } from '@nestjs/common';
import { AdopoterController } from './infrastructure/adopter.controller';
import { AdopterSchema } from './infrastructure/adopter.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdopterRepositoryImpl } from './infrastructure/adopter.repository';
import { CreateAdopterUseCase } from './application/create-adopter.usecase';
import { AdopterOutputMapper } from './application/outputs/adopter.output';

@Module({
  imports: [TypeOrmModule.forFeature([AdopterSchema])],
  controllers: [AdopoterController],
  providers: [
    CreateAdopterUseCase,
    AdopterOutputMapper,
    {
      provide: 'AdopterRepository',
      useClass: AdopterRepositoryImpl,
    },
  ],
})
export class AdopterModule {}

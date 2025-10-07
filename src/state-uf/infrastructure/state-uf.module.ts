import { Module } from '@nestjs/common';
import { StateUfSchema } from './state-uf.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateUfController } from './state-uf.controller';
import { FindAllStatesUseCase } from '../application/find-all-states.usecase';
import { StateUfRepositoryImpl } from './state-uf.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StateUfSchema])],
  controllers: [StateUfController],
  providers: [
    FindAllStatesUseCase,
    {
      provide: 'StateUfRepository',
      useClass: StateUfRepositoryImpl,
    },
  ],
  exports: ['StateUfRepository'],
})
export class StateUfModule {}

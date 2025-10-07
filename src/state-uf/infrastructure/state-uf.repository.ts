import { InjectRepository } from '@nestjs/typeorm';
import { StateUf } from '../domain/state-uf.entity';
import { StateUfRepository } from '../domain/state-uf.repository';
import { StateUfSchema } from './state-uf.schema';
import { Repository } from 'typeorm';

export class StateUfRepositoryImpl implements StateUfRepository {
  constructor(
    @InjectRepository(StateUfSchema)
    private readonly stateUfRepository: Repository<StateUfSchema>,
  ) {}

  async findAllStates(): Promise<StateUf[]> {
    const states = await this.stateUfRepository.find();
    return states;
  }
}

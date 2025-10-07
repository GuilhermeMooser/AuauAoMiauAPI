import { StateUf } from './state-uf.entity';

export interface StateUfRepository {
  findAllStates(): Promise<StateUf[]>;
}

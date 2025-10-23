import { StateUfSchema } from '@/state-uf/infrastructure/state-uf.schema';

export class CityOutput {
  id: number;
  name: string;
  stateUf: StateUfSchema;
}

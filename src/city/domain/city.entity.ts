import { StateUf } from '@/state-uf/domain/state-uf.entity';

type CityProps = {
  id?: number;
  name: string;
  stateUf: StateUf;
  ibge: number;
};

export class City {
  id: number;
  name: string;
  stateUf: StateUf;
  ibge: number;

  constructor(props?: CityProps) {
    this.id = props?.id;
    this.name = props?.name;
    this.stateUf = props?.stateUf;
    this.ibge = props?.ibge;
  }
}

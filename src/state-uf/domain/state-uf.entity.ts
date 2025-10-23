type StateProps = {
  id: number;
  name: string;
  acronym: string;
};

export class StateUf {
  id: number;
  name: string;
  acronym: string;

  constructor(props?: StateProps) {
    this.id = props?.id;
    this.name = props?.name;
    this.acronym = props?.acronym;
  }
}

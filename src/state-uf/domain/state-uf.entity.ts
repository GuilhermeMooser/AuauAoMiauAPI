type StateProps = {
  id: number;
  name: string;
  acronym: string;
  country: string;
};

export class StateUF {
  id: number;
  name: string;
  acronym: string;
  country: string;

  constructor(props?: StateProps) {
    this.id = props?.id;
    this.name = props?.name;
    this.acronym = props?.acronym;
    this.country = props?.country;
  }
}

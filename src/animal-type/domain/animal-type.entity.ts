type AnimalTypeProps = {
  id?: number;
  type: string
}

export class AnimalType {
  id: number;
  type: string

  constructor(props: AnimalTypeProps) {
    Object.assign(this, props);
  }
}
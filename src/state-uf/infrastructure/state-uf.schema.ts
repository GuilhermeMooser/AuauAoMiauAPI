import { CitySchema } from '@/city/infrastructure/city.schema';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('state_uf')
export class StateUfSchema {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'uf' })
  acronym: string;

  @OneToMany(() => CitySchema, city => city.stateUf)
  cities?: CitySchema[];
}

import { AdopterAddressSchema } from '@/adopter-address/infrastructure/adopter-address.schema';
import { StateUfSchema } from '@/state-uf/infrastructure/state-uf.schema';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('city')
export class CitySchema {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'ibge' })
  ibge: number;

  @JoinColumn({ name: 'uf' })
  @ManyToOne(() => StateUfSchema, state => state.cities)
  stateUf: StateUfSchema;

  @OneToMany(() => AdopterAddressSchema, address => address.city)
  addresses: AdopterAddressSchema[];
}

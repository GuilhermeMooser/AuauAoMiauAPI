import { AdopterSchema } from '@/adopter/infrastructure/adopter.schema';
import { CitySchema } from '@/city/infrastructure/city.schema';
import { CreatedAtAuditableSchema } from '@/shared/infrastructure/auditable/created-at-auditable-schema';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adopter_address')
export class AdopterAddressSchema extends CreatedAtAuditableSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'street' })
  street: string;

  @Column({ name: 'number', nullable: true })
  number: number;

  @Column({ name: 'neighborhood', nullable: true })
  neighborhood: string;

  @JoinColumn({name: 'adopter'})
  @ManyToOne(() => AdopterSchema, (adopter) => adopter.addresses)
  adopter: AdopterSchema

  @JoinColumn({name: 'city'})
  @ManyToOne(() => CitySchema, (city) => city.addresses)
  city: CitySchema
}

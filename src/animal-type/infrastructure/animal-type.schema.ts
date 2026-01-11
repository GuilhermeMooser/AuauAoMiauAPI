import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('animal_type')
export class AnimalTypeSchema {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'type' })
  type: string;
}
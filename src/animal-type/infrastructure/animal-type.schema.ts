import { AnimalSchema } from "@/animals/infrastructure/animal.schema";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('animal_type')
export class AnimalTypeSchema {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'type' })
  type: string;

  @OneToOne(() => AnimalSchema, (animal) => animal.type)
  animal: AnimalSchema;
}
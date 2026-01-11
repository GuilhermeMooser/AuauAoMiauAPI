import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnimalTypeSchema } from "./animal-type.schema";
import { AnimalTypeRepositoryRepositoryImpl } from "./animal-type.repository";

@Module({
  imports: [TypeOrmModule.forFeature([AnimalTypeSchema])],
  providers: [
    {
      provide: 'AnimalTypeRepository',
      useClass: AnimalTypeRepositoryRepositoryImpl
    }
  ],
  exports: ['AnimalTypeRepository']
})
export class AnimalTypeModule { }
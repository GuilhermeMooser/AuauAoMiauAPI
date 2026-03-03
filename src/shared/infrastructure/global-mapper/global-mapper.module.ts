import { Module } from '@nestjs/common';
import { MinimalExpensesOutputMapper } from '@/expenses/application/output/minimal-expenses-output';
import { AnimalProcedureOutputMapper } from '@/procedures/animal-procedures/application/outputs/animal-procedure.output';
import { AnimalOutputMapper } from '@/animals/application/outputs/animal.output';
import { MinimalAdopterOutputMapper } from '@/adopter/application/outputs/minimal-adopter.output';
import { AdopterOutputMapper } from '@/adopter/application/outputs/adopter.output';
import { AdopterAddressOutputMapper } from '@/adopter-address/application/outputs/adopter-address.output';
import { AdopterContactOutputMapper } from '@/adopter-contact/application/outputs/adopter-contact.output';
import { TermOutputMapper } from '@/terms/application/outputs/term.output';
import { MinimalAnimalOutputMapper } from '@/animals/application/outputs/minimal-animal.output';

@Module({
  providers: [
    MinimalExpensesOutputMapper,
    AnimalProcedureOutputMapper,
    AdopterAddressOutputMapper,
    AdopterContactOutputMapper,
    MinimalAdopterOutputMapper,
    TermOutputMapper,
    AdopterOutputMapper,
    AnimalOutputMapper,
    MinimalAnimalOutputMapper,
  ],
  exports: [
    MinimalExpensesOutputMapper,
    AnimalProcedureOutputMapper,
    AdopterAddressOutputMapper,
    AdopterContactOutputMapper,
    MinimalAdopterOutputMapper,
    TermOutputMapper,
    AdopterOutputMapper,
    AnimalOutputMapper,
    MinimalAnimalOutputMapper,
  ],
})
export class MapperModule {}

import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAnimalDto } from './create-animal.dto';
import { UpdateAnimalProcedureDispatcherDto } from './update-animal-procedure-dispatcher.dto';
import { Type } from 'class-transformer';

export class UpdateAnimalDto extends CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAnimalProcedureDispatcherDto)
  declare animalProcedures?: UpdateAnimalProcedureDispatcherDto[];
}

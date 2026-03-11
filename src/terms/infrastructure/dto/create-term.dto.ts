import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTermDto {
  @IsString()
  @IsNotEmpty()
  animalId: string;

  @IsString()
  @IsNotEmpty()
  adopterId: string;
}

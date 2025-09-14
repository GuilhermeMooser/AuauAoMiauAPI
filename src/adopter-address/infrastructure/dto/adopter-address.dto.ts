import { City } from '@/city/domain/city.entity';
import { StateUF } from '@/state-uf/domain/state-uf.entity';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AdopterAddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsInt()
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  city: City; //VER AINDA
  state: StateUF; //VER AINDA
}

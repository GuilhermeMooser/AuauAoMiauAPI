import { City } from '@/city/domain/city.entity';
import { CityDto } from '@/city/infrastructure/dto/city.dto';
import { StateUF } from '@/state-uf/domain/state-uf.entity';
import { StateUfDto } from '@/state-uf/infrastructure/dto/state-uf.dto';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

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

  @ValidateNested()
  @Type(() => CityDto)
  city: CityDto;
}

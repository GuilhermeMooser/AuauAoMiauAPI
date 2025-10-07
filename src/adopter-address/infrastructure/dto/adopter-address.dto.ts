import { CityDto } from '@/city/infrastructure/dto/city.dto';
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

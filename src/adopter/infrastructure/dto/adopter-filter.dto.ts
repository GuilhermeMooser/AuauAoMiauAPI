import { CityDto } from '@/city/infrastructure/dto/city.dto';
import { StateUfDto } from '@/state-uf/infrastructure/dto/state-uf.dto';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export type StatusType = 'all' | 'active' | 'inactive';

export class AdopterFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsIn(['all', 'active', 'inactive'], {
    message: 'Status should be all, active ou inactive',
  })
  status?: StatusType;

  @IsOptional()
  @ValidateNested()
  @Type(() => StateUfDto)
  stateUf?: StateUfDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CityDto)
  city?: CityDto;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dtToNotify?: Date;
}

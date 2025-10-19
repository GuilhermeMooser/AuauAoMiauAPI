import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export type StatusType = 'all' | 'active' | 'inactive';

export class AdopterFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  s?: string;

  @IsOptional()
  @IsIn(['all', 'active', 'inactive'], {
    message: 'Status should be all, active ou inactive',
  })
  status?: StatusType;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  cityId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  stateUfId?: number;

  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @IsOptional()
  @IsDateString()
  dtToNotify?: string;
}

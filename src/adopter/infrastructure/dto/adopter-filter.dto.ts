import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class AdopterFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  s?: string;

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

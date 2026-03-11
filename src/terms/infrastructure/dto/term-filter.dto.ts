import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class TermFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  s?: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string;
}

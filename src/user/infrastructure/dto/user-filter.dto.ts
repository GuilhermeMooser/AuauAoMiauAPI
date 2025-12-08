import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class UserFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  s?: string;
}

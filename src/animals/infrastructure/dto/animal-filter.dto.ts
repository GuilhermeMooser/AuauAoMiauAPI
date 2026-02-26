import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class AnimalFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  s?: string;
}

import { PaginationDto } from '@/shared/infrastructure/dto/pagination.dto';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class AnimalFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  s?: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @IsOptional()
  @IsDateString()
  dtOfAdoption?: string;

  @IsOptional()
  @IsDateString()
  dtOfRescue?: string;

  @IsOptional()
  @IsDateString()
  dtOfDeath?: string;
}

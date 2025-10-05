import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ description: 'Current page number' })
  page: number;

  @ApiProperty({ description: 'Direction' })
  direction: 'ASC' | 'DESC' | null;

  @ApiProperty({ description: 'Maximum number of items on the page' })
  limit: number;
}

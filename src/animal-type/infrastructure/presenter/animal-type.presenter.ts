import { ApiProperty } from '@nestjs/swagger';

export class AnimalTypePresenter {
  @ApiProperty({ description: 'ID' })
  id: number;

  @ApiProperty({ description: 'Type' })
  type: string;
}

import { CityPresenter } from "@/city/infrastructure/presenters/city.presenter";
import { ApiProperty } from "@nestjs/swagger";

export class AdopterAddressPresenter {
  @ApiProperty({description: 'ID'})
  id: string;

  @ApiProperty({description: 'Street name'})
  street: string;

  @ApiProperty({description: 'Number'})
  number?: number;

  @ApiProperty({description: 'Neighborhood'})
  neighborhood?: string;

  @ApiProperty({description: 'City'})
  city: CityPresenter;
}

import { AdopterAddressPresenter } from "@/adopter-address/infrastructure/presenters/adopter-address.presenter";
import { AnimalPresenter } from "@/animals/infrastructure/presenters/animal.presenter";
import { ApiProperty } from "@nestjs/swagger";

export class MinimalAdopterPresenter {
  @ApiProperty({description: 'ID'})
  id: string;

  @ApiProperty({description: 'Name'})
  name: string;

  @ApiProperty({description: 'Brazilian Tax ID'})
  cpf: string;

  @ApiProperty({description: 'Adopter profession'})
  profession: string;

  @ApiProperty({description: 'Adopter addresses'})
  addresses: AdopterAddressPresenter[];

  @ApiProperty({description: 'Notification active'})
  activeNotification: boolean;

  @ApiProperty({description: 'Date to notify'})
  dtToNotify?: Date;

  @ApiProperty({description: 'Animals'})
  animals?: AnimalPresenter[];
}

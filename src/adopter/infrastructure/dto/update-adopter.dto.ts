import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAdopterDto } from './create-adopter.dto';

export class  UpdateAdopterDto extends CreateAdopterDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

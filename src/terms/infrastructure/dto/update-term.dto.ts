import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTermDto } from './create-term.dto';

export class UpdateTermDto extends CreateTermDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

import { CreateUserDto } from './createUser.dto';

export class UpdateUserDto extends CreateUserDto {
  readonly id: number;
}

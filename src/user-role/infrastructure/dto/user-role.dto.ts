import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserRoleDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

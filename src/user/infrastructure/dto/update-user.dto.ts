import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  password: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(14)
  cpf: string;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}

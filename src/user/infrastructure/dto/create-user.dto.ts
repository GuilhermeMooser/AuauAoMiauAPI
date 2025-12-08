import { UserRoleDto } from '@/user-role/infrastructure/dto/user-role.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
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

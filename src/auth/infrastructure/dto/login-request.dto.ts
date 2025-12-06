import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ description: 'Login from user' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: 'Password from user' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

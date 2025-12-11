import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ description: 'Email from user' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password from user' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

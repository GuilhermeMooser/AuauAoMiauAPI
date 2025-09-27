import { AdopterAddressDto } from '@/adopter-address/infrastructure/dto/adopter-address.dto';
import { AdopterContactDto } from '@/adopter-contacts/infrastructure/dto/adopter-contact.dto';
import type { MaritalStatusUnion } from '@/adopter/domain/adopter.entity';
import { AnimalDto } from '@/animals/infrastructure/dto/animal.dto';
import { TermDto } from '@/terms/infrastructure/dto/term.dto';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class CreateAdopterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @Type(() => Date)
  dtOfBirth: Date;

  @IsString()
  @IsNotEmpty()
  rg: string;

  @IsString()
  @IsNotEmpty()
  @Length(14, 14)
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ValidateNested({ each: true })
  @Type(() => AdopterContactDto)
  contacts: AdopterContactDto[];

  @IsString()
  @IsNotEmpty()
  profession: string;

  @IsString()
  @IsIn([
    'solteiro',
    'casado',
    'divorciado',
    'viúvo',
    'separado',
    'união_estável',
  ])
  civilState: MaritalStatusUnion;

  @ValidateNested({ each: true })
  @Type(() => AdopterAddressDto)
  addresses: AdopterAddressDto[];

  @IsBoolean()
  @IsNotEmpty()
  activeNotification: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dtToNotify?: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AnimalDto)
  animals?: AnimalDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TermDto)
  terms?: TermDto[];
}

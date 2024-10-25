import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: '', description: 'Clinic ID' })
  @IsString()
  @IsNotEmpty()
  clinic_id: string;

  @ApiProperty({ example: 'AC1234567', description: 'Client passport' })
  @IsString()
  @IsNotEmpty()
  passport: string;

  @ApiProperty({ example: 'John Doe', description: 'Client full name' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: '1990-10-17', description: 'Client birthday' })
  @IsDateString()
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({ example: '+998901234567', description: 'Client phone number' })
  @IsPhoneNumber(null)
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ example: 'male', enum: ['male', 'female'], description: 'Client sex' })
  @IsEnum(['male', 'female'])
  @IsNotEmpty()
  sex: 'male' | 'female';

  @ApiProperty({ example: false, description: 'Client nonresident' })
  @IsBoolean()
  @IsNotEmpty()
  nonresident: boolean;
}

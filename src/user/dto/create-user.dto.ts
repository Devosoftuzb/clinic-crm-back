import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: '+998901234567', description: 'User phone number' })
  @IsPhoneNumber(null)
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ example: 'john', description: 'User login' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  login: string;

  @ApiProperty({ example: 'password', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'owner',
    enum: ['superadmin', 'admin', 'owner'],
    description: 'Role name',
  })
  @IsEnum(['superadmin', 'admin', 'owner'])
  @IsNotEmpty()
  role: 'superadmin' | 'admin' | 'owner';
}

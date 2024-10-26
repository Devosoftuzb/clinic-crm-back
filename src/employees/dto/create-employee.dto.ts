import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    example: 'a76eadf0-e2ef-4357-aa08-744e5c045a27',
    description: 'Employee ID',
  })
  @IsString()
  @IsNotEmpty()
  clinic_id: string;

  @ApiProperty({ example: 'John Doe', description: 'Employee full name' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: '1990-10-17', description: 'Employee birthday' })
  @IsDateString()
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Employee phone number',
  })
  @IsPhoneNumber(null)
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ example: 'john', description: 'Employee login' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  login: string;

  @ApiProperty({ example: 'password', description: 'Employee password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'manager',
    enum: ['manager', 'administrator', 'accountant', 'storekeeper'],
    description: 'Role name',
  })
  @IsEnum(['manager', 'administrator', 'accountant', 'storekeeper'])
  @IsNotEmpty()
  role: 'manager' | 'administrator' | 'accountant' | 'storekeeper';
}

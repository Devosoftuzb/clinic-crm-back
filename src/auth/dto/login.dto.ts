import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '+998901234567', description: 'Staff phone number' })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ example: 'qwerty', description: 'Staff password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

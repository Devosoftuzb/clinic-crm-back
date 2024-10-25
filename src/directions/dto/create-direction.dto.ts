import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDirectionDto {
  @ApiProperty({ example: 'a76eadf0-e2ef-4357-aa08-744e5c045a27', description: 'Clinic ID' })
  @IsString()
  @IsNotEmpty()
  clinic_id: string;
  
  @ApiProperty({ example: 'Name', description: 'Direction name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

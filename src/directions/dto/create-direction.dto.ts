import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDirectionDto {
  @ApiProperty({ example: '', description: 'Clinic ID' })
  @IsString()
  @IsNotEmpty()
  clinic_id: string;
  
  @ApiProperty({ example: 'Name', description: 'Direction name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTheadDto {
  @ApiProperty({ example: 'id', description: 'Clinic ID' })
  @IsString()
  @IsNotEmpty()
  clinic_id: string;

  @ApiProperty({ example: 1, description: 'Direction ID' })
  @IsNumber()
  @IsNotEmpty()
  direction_id: number;

  @ApiProperty({ example: 1, description: 'Direction type ID' })
  @IsNumber()
  @IsNotEmpty()
  service_id: number;

  @ApiProperty({ example: 'list', description: 'Table thead' })
  thead: any; 
}

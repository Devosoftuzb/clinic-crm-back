import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDirectionTypeDto {
  @ApiProperty({ example: 1, description: 'Direction ID' })
  @IsInt()
  @IsNotEmpty()
  direction_id: number;

  @ApiProperty({ example: 'Name', description: 'Direction type name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTbodyDto {
  @ApiProperty({ example: 1, description: 'Thead ID' })
  @IsNumber()
  @IsNotEmpty()
  thead_id: number;

  @ApiProperty({ example: 'list', description: 'Tbody list value' })
  @IsNotEmpty()
  tbody: any;
}

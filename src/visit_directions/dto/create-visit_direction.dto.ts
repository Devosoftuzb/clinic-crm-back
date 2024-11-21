import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateVisitDirectionDto {
  @ApiProperty({ example: 1, description: 'Visit ID' })
  @IsInt()
  @IsNotEmpty()
  visit_id: number;

  @ApiProperty({ example: 'List', description: 'Visit direction list' })
  @IsNotEmpty()
  list: any;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateVisitDto {
  @ApiProperty({
    example: 'a76eadf0-e2ef-4357-aa08-744e5c045a27',
    description: 'Clinic ID',
  })
  @IsString()
  @IsNotEmpty()
  clinic_id: string;

  @ApiProperty({
    example: 'a76eadf0-e2ef-4357-aa08-744e5c045a27',
    description: 'Client ID',
  })
  @IsString()
  @IsNotEmpty()
  client_id: string;

  @ApiProperty({ example: '2024-10-15', description: 'Visit date' })
  @IsString()
  @IsNotEmpty()
  visit_date: string;

  @ApiProperty({
    example: 'outpatient',
    enum: ['outpatient', 'hospital'],
    description: 'Stay type',
  })
  @IsEnum(['outpatient', 'hospital'])
  @IsNotEmpty()
  stay_type: 'outpatient' | 'hospital';

  @ApiProperty({ example: 2000000, description: 'Total amount' })
  @IsInt()
  @IsNotEmpty()
  total_amount: number;

  @ApiProperty({ example: 2000000, description: 'Total balance' })
  @IsInt()
  @IsNotEmpty()
  total_balance: number;

  @ApiProperty({ example: 5, description: 'Discount' })
  discount: number;
}

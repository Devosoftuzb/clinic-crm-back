import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDoctorDirectionDto {
  @ApiProperty({
    example: 1,
    description: 'Direction ID',
  })
  @IsInt()
  @IsNotEmpty()
  direction_id: number;

  @ApiProperty({
    example: 'a76eadf0-e2ef-4357-aa08-744e5c045a27',
    description: 'Doctor ID',
  })
  @IsString()
  @IsNotEmpty()
  doctor_id: string;

  @ApiProperty({
    example: 100000,
    description: 'Price',
  })
  @IsInt()
  @IsNotEmpty()
  price: number;
}

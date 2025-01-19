import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 'a76eadf0-e2ef-4357-aa08-744e5c045a27', description: 'Clinic ID' })
  @IsString()
  @IsNotEmpty()
  clinic_id: string;

  @ApiProperty({ example: 1, description: 'Visit ID' })
  @IsInt()
  @IsNotEmpty()
  visit_id: number;

  @ApiProperty({ example: 1, description: 'Room ID' })
  @IsInt()
  room_id: number;

  @ApiProperty({ example: 1, description: 'Direction ID' })
  @IsInt()
  direction_id: number;

  @ApiProperty({ example: 1, description: 'Payment method ID' })
  @IsInt()
  @IsNotEmpty()
  payment_method_id: number;

  @ApiProperty({ example: 10000, description: 'Payment  price' })
  @IsInt()
  @IsNotEmpty()
  price: number;
}

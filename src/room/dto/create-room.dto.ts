import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    example: 'a76eadf0-e2ef-4357-aa08-744e5c045a27',
    description: 'Clinic ID',
  })
  @IsString()
  @IsNotEmpty()
  clinic_id: string;

  @ApiProperty({ example: '15 room', description: 'Room name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 4, description: 'Room number seats' })
  @IsNumber()
  @IsNotEmpty()
  number_seats: number;

  @ApiProperty({ example: 10000, description: 'Room price' })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}

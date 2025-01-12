import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentMethodDto {
  @ApiProperty({ example: 1, description: 'Clinic ID' })
  @IsNotEmpty()
  @IsString()
  clinic_id: string;

  @ApiProperty({ example: 'Terminal', description: 'Payment method name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

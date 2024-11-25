import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateVisitDirectionDto {
  @ApiProperty({ example: 1, description: 'Visit ID' })
  visit_id: number;

  @ApiProperty({ example: 1, description: 'Direction ID' })
  direction_id: number;

  @ApiProperty({ example: 1, description: 'Direction Type ID' })
  service_id: number;

  @ApiProperty({ example: 1, description: 'Doctor ID' })
  doctor_id: string;

  @ApiProperty({ example: 200000, description: 'Price' })
  price: number;

  @ApiProperty({ example: true, description: 'Is Payment' })
  is_payment: boolean;

  @ApiProperty({ example: true, description: 'Is Checked' })
  is_checked: boolean;

  @ApiProperty({ example: 'diagnosis', description: 'Client diagnosis' })
  diagnosis: string;

  @ApiProperty({ example: 'retsept', description: 'Client retsept' })
  retsept: string;
}

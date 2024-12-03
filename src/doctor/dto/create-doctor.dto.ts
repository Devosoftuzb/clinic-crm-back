import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString, IsInt, MinLength, IsEnum } from "class-validator";

export class CreateDoctorDto {
  @ApiProperty({
    example: 'a76eadf0-e2ef-4357-aa08-744e5c045a27',
    description: 'Clinic ID',
  })
  @IsString()
  @IsNotEmpty()
  clinic_id: string;

  @ApiProperty({ example: 'John Doe', description: 'Doctor full name' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: '09-09-2024', description: 'Doctor birthday' })
  @IsString()
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({ example: '+998901234567', description: 'Doctor phone number' })
  @IsPhoneNumber(null)
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ example: 1, description: 'Doctor experience' })
  @IsNotEmpty()
  @IsInt()
  experience: number;

  // @ApiProperty({ example: '1 etaj 2 xona', description: 'Doctor room' })
  // @IsString()
  // @IsNotEmpty()
  // room: string;

  @ApiProperty({ example: 'john', description: 'Employee login' })
  @MinLength(3)
  login: string;

  @ApiProperty({ example: 'password', description: 'Employee password' })
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'doctor',
    enum: ['doctor', 'lab_technician', 'external_doctor'],
    description: 'Role name',
  })
  @IsEnum(['doctor', 'lab_technician', 'external_doctor'])
  @IsNotEmpty()
  role: 'doctor' | 'lab_technician'| 'external_doctor';
}

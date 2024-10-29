import { PartialType } from '@nestjs/swagger';
import { CreateDoctorDirectionDto } from './create-doctor_direction.dto';

export class UpdateDoctorDirectionDto extends PartialType(CreateDoctorDirectionDto) {}

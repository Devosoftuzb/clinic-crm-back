import { Module } from '@nestjs/common';
import { DoctorDirectionService } from './doctor_direction.service';
import { DoctorDirectionController } from './doctor_direction.controller';

@Module({
  controllers: [DoctorDirectionController],
  providers: [DoctorDirectionService],
})
export class DoctorDirectionModule {}

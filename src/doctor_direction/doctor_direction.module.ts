import { Module } from '@nestjs/common';
import { DoctorDirectionService } from './doctor_direction.service';
import { DoctorDirectionController } from './doctor_direction.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DoctorDirection } from './models/doctor_direction.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([DoctorDirection]), JwtModule],
  controllers: [DoctorDirectionController],
  providers: [DoctorDirectionService],
})
export class DoctorDirectionModule {}

import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.model';
import { JwtModule } from '@nestjs/jwt';
import { Employee } from 'src/employees/models/employee.model';
import { User } from 'src/user/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Doctor, Employee, User]), JwtModule],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}

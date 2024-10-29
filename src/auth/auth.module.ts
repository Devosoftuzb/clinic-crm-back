import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/user/models/user.model';
import { Employee } from 'src/employees/models/employee.model';
import { Doctor } from 'src/doctor/models/doctor.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Employee, Doctor]), JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}

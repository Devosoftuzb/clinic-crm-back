import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { Employee } from 'src/employees/models/employee.model';
import { Doctor } from 'src/doctor/models/doctor.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Employee, Doctor]), JwtModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

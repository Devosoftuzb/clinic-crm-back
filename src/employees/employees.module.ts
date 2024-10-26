import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './models/employee.model';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Employee, User]), JwtModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}

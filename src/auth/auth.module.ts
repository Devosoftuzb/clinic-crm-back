import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { Staff } from 'src/staff/models/staff.model';
// import { Doctor } from 'src/doctor/models/doctor.model';
// import { OutsideStaff } from 'src/outside_staff/models/outside_staff.model';

@Module({
  // imports: [SequelizeModule.forFeature([Staff, Doctor, OutsideStaff]), JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}

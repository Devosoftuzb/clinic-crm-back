import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Clinic } from './models/clinic.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Clinic]), JwtModule],
  controllers: [ClinicController],
  providers: [ClinicService],
})
export class ClinicModule {}

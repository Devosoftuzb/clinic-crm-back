import { Module } from '@nestjs/common';
import { TheadService } from './thead.service';
import { TheadController } from './thead.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Thead } from './models/thead.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Thead]), JwtModule],
  controllers: [TheadController],
  providers: [TheadService],
})
export class TheadModule {}

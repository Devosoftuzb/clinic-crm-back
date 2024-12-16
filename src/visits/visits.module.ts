import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Visit } from './models/visit.model';
import { JwtModule } from '@nestjs/jwt';
import { Room } from 'src/room/models/room.model';

@Module({
  imports: [SequelizeModule.forFeature([Visit, Room]), JwtModule],
  controllers: [VisitsController],
  providers: [VisitsService],
})
export class VisitsModule {}

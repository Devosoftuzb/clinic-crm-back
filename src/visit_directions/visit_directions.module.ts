import { Module } from '@nestjs/common';
import { VisitDirectionsService } from './visit_directions.service';
import { VisitDirectionsController } from './visit_directions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { VisitDirection } from './models/visit_direction.model';
import { JwtModule } from '@nestjs/jwt';
import { Visit } from 'src/visits/models/visit.model';

@Module({
  imports: [SequelizeModule.forFeature([VisitDirection, Visit]), JwtModule],
  controllers: [VisitDirectionsController],
  providers: [VisitDirectionsService],
})
export class VisitDirectionsModule {}

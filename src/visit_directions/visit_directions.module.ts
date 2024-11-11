import { Module } from '@nestjs/common';
import { VisitDirectionsService } from './visit_directions.service';
import { VisitDirectionsController } from './visit_directions.controller';

@Module({
  controllers: [VisitDirectionsController],
  providers: [VisitDirectionsService],
})
export class VisitDirectionsModule {}

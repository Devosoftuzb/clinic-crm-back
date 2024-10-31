import { Module } from '@nestjs/common';
import { DirectionTypesService } from './direction_types.service';
import { DirectionTypesController } from './direction_types.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DirectionType } from './models/direction_types.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([DirectionType]), JwtModule],
  controllers: [DirectionTypesController],
  providers: [DirectionTypesService],
})
export class DirectionTypesModule {}

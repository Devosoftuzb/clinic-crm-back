import { Module } from '@nestjs/common';
import { TbodyService } from './tbody.service';
import { TbodyController } from './tbody.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tbody } from './models/tbody.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Tbody]), JwtModule],
  controllers: [TbodyController],
  providers: [TbodyService],
})
export class TbodyModule {}

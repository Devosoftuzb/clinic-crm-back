import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { JwtModule } from '@nestjs/jwt';
import { Visit } from 'src/visits/models/visit.model';
import { Client } from 'src/client/models/client.model';
import { PaymentMethod } from 'src/payment_method/models/payment_method.model';

@Module({
  imports: [SequelizeModule.forFeature([Payment, Visit, Client, PaymentMethod]), JwtModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { Op, where } from 'sequelize';
import { Client } from 'src/client/models/client.model';
import { Visit } from 'src/visits/models/visit.model';
import { PaymentMethod } from 'src/payment_method/models/payment_method.model';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private repo: typeof Payment,
    @InjectModel(Client) private repoClient: typeof Client,
    @InjectModel(Visit) private repoVisit: typeof Visit,
    @InjectModel(PaymentMethod) private repoPaymentMethod: typeof PaymentMethod,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const student = await this.repo.create(createPaymentDto);
    return {
      message: 'Payment created successfully',
      student,
    };
  }

  async findAll(clinic_id: string) {
    return await this.repo.findAll({
      where: { clinic_id },
    });
  }

  async paginate(clinic_id: string, page: number): Promise<object> {
    try {
      page = Number(page);
      const limit = 15;
      const offset = (page - 1) * limit;
      const user = await this.repo.findAll({
        where: { clinic_id: clinic_id },
        include: { all: true },
        offset,
        limit,
      });
      const total_count = await this.repo.count();
      const total_pages = Math.ceil(total_count / limit);
      const res = {
        status: 200,
        data: {
          records: user,
          pagination: {
            currentPage: page,
            total_pages,
            total_count,
          },
        },
      };
      return res;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async filter(
    clinic_id: string,
    start_date: string,
    end_date: string,
    page: number,
  ): Promise<object> {
    try {
      const limit = 15;
      const offset = Math.max(page - 1, 0) * limit;

      const startOfDay = new Date(start_date);
      startOfDay.setHours(0, 0, 0, 0);
      startOfDay.setHours(startOfDay.getHours() + 5);

      const endOfDay = new Date(end_date);
      endOfDay.setHours(23, 59, 59, 999);
      endOfDay.setHours(endOfDay.getHours() + 5);

      const payments = await this.repo.findAll({
        where: {
          clinic_id,
          createdAt: { [Op.between]: [startOfDay, endOfDay] },
        },
        offset,
        limit,
        order: [['createdAt', 'DESC']],
      });

      if (!payments.length) {
        throw new NotFoundException(
          'No payments found for the specified criteria.',
        );
      }

      const total_count = await this.repo.count({
        where: {
          clinic_id,
          createdAt: { [Op.between]: [startOfDay, endOfDay] },
        },
      });

      const visitIds = payments.map((p) => p.visit_id);

      const visits = await this.repoVisit.findAll({
        where: { id: { [Op.in]: visitIds } },
      });
      const clientIds = visits.map((v) => v.client_id);
      const clients = await this.repoClient.findAll({
        where: { id: { [Op.in]: clientIds } },
      });

      const paymentMethods = await this.repoPaymentMethod.findAll({
        where: { clinic_id },
      });

      const formattedPayments = payments.map((payment) => {
        const visit = visits.find((v) => v.id === payment.visit_id);
        const client = clients.find((c) => c.id === visit?.client_id);
        const method = paymentMethods.find(
          (pm) => pm.id === payment.payment_method_id,
        );

        const adjustedPaymentDate = new Date(payment.createdAt);
        adjustedPaymentDate.setHours(adjustedPaymentDate.getHours() + 5);

        return {
          payment_id: payment.id,
          visit_id: payment.visit_id,
          client_id: visit?.client_id,
          client_name: client?.full_name || 'Unknown',
          price: payment.price,
          payment_date: adjustedPaymentDate,
          payment_method: method?.name || 'Unknown',
        };
      });

      const total_amount = payments.reduce((sum, p) => sum + p.price, 0);
      const amount = paymentMethods.map((pm) => ({
        [pm.name]: payments
          .filter((p) => p.payment_method_id === pm.id)
          .reduce((sum, p) => sum + p.price, 0),
      }));

      return {
        status: 200,
        message: 'Payments retrieved successfully',
        data: {
          records: formattedPayments,
          amount: [...amount, { total_amount }],
          pagination: {
            currentPage: page,
            total_pages: Math.ceil(total_count / limit),
            total_count,
          },
        },
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve payments. Please try again later.',
      );
    }
  }

  async findOne(id: number, clinic_id: string) {
    const payment = await this.repo.findOne({
      where: {
        id,
        clinic_id,
      },
      include: { all: true },
    });

    if (!payment) {
      throw new BadRequestException(`Payment with id ${id} not found`);
    }

    return payment;
  }

  async update(
    id: number,
    clinic_id: string,
    updatePaymentDto: UpdatePaymentDto,
  ) {
    const payment = await this.findOne(id, clinic_id);
    await payment.update(updatePaymentDto);

    return {
      message: 'Payment updated successfully',
      payment,
    };
  }

  async remove(id: number, clinic_id: string) {
    const payment = await this.findOne(id, clinic_id);
    await payment.destroy();

    return {
      message: 'Payment removed successfully',
    };
  }
}

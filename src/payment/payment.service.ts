import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { Op } from 'sequelize';

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment) private repo: typeof Payment) {}

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
      page = Number(page);
      const limit = 15;
      const offset = (page - 1) * limit;

      const startOfDay = new Date(start_date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(end_date);
      endOfDay.setHours(23, 59, 59, 999);

      const user = await this.repo.findAll({
        where: {
          clinic_id: clinic_id,
          createdAt: {
            [Op.between]: [new Date(startOfDay), new Date(endOfDay)],
          },
        },
        include: { all: true },
        offset,
        limit,
      });

      const total_count = await this.repo.count({
        where: {
          clinic_id: clinic_id,
          createdAt: {
            [Op.between]: [new Date(startOfDay), new Date(endOfDay)],
          },
        },
      });

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

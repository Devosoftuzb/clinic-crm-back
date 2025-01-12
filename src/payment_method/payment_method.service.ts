import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentMethod } from './models/payment_method.model';

@Injectable()
export class PaymentMethodService {
  constructor(@InjectModel(PaymentMethod) private repo: typeof PaymentMethod) {}

  async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    const student = await this.repo.create(createPaymentMethodDto);
    return {
      message: 'Payment method created successfully',
      student,
    };
  }

  async findAllBySchoolId(clinic_id: number) {
    return await this.repo.findAll({
      where: { clinic_id },
    });
  }

  async paginate(clinic_id: number, page: number): Promise<object> {
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

  async findOne(id: number, clinic_id: number) {
    const paymentMethod = await this.repo.findOne({
      where: {
        id,
        clinic_id,
      },
      include: { all: true },
    });

    if (!paymentMethod) {
      throw new BadRequestException(`Payment method with id ${id} not found`);
    }

    return paymentMethod;
  }

  async update(
    id: number,
    clinic_id: number,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    const paymentMethod = await this.findOne(id, clinic_id);
    await paymentMethod.update(updatePaymentMethodDto);

    return {
      message: 'Payment method updated successfully',
      paymentMethod,
    };
  }

  async remove(id: number, clinic_id: number) {
    const paymentMethod = await this.findOne(id, clinic_id);
    await paymentMethod.destroy();

    return {
      message: 'Payment method removed successfully',
    };
  }
}

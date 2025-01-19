import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVisitDirectionDto } from './dto/create-visit_direction.dto';
import { UpdateVisitDirectionDto } from './dto/update-visit_direction.dto';
import { InjectModel } from '@nestjs/sequelize';
import { VisitDirection } from './models/visit_direction.model';
import { Op } from 'sequelize';
import { Visit } from 'src/visits/models/visit.model';

@Injectable()
export class VisitDirectionsService {
  constructor(
    @InjectModel(VisitDirection) private repo: typeof VisitDirection,
    @InjectModel(Visit) private repoVisit: typeof Visit,
  ) {}

  async create(createVisitDirectionDto: CreateVisitDirectionDto) {
    try {
      let visit_direction = [];
      let totalPrice = 0;

      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      for (const item of createVisitDirectionDto.list) {
        const lastVisitDirection = await this.repo.findOne({
          where: {
            direction_id: item.direction_id,
            service_id: item.service_id,
            doctor_id: item.doctor_id,
            createdAt: {
              [Op.between]: [todayStart, todayEnd],
            },
          },
          order: [['line', 'DESC']],
        });

        const line = lastVisitDirection ? lastVisitDirection.line + 1 : 1;

        const createdVisitDirection = await this.repo.create({
          visit_id: createVisitDirectionDto.visit_id,
          ...item,
          line,
        });

        totalPrice += createdVisitDirection.price;
        visit_direction.push(createdVisitDirection);
      }

      const visit = await this.repoVisit.findOne({
        where: {
          id: createVisitDirectionDto.visit_id,
        },
      });

      if (!visit) {
        throw new BadRequestException('Visit not found');
      }

      let updatedAmount = visit.amount.map((amountItem) => ({
        ...amountItem,
        total_amount: amountItem.total_amount + totalPrice,
      }));

      for (let i in visit_direction) {
        updatedAmount = updatedAmount.map((amountItem) => ({
          ...amountItem,
          [visit_direction[i].service_id]: visit_direction[i].price,
        }));
      }

      await visit.update({ amount: updatedAmount });

      return {
        message: 'Visit direction created successfully',
        visit_direction,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create visit direction. Please try again later',
        error,
      );
    }
  }

  async findAll() {
    try {
      const visit_directions = await this.repo.findAll();
      return {
        message: 'Visit directions retrieved successfully',
        visit_directions,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve visit directions. Please try again later',
        error,
      );
    }
  }

  async paginate(page: number): Promise<object> {
    try {
      page = Number(page);
      const limit = 15;
      const offset = (page - 1) * limit;
      const visit_directions = await this.repo.findAll({ offset, limit });
      const total_count = await this.repo.count();
      const total_pages = Math.ceil(total_count / limit);
      return {
        status: 200,
        message: 'Visit directions retrieved successfully',
        data: {
          records: visit_directions,
          pagination: {
            currentPage: page,
            total_pages,
            total_count,
          },
        },
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve direction types. Please try again later',
        error,
      );
    }
  }

  async findOne(id: number) {
    try {
      const visit_direction = await this.repo.findByPk(id, {
        include: { all: true },
      });
      if (!visit_direction) {
        throw new BadRequestException(
          `Visit direction with id ${id} not found`,
        );
      }
      return {
        message: 'Visit direction retrieved successfully',
        visit_direction,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve visit direction. Please try again later',
        error,
      );
    }
  }

  async update(id: number, updateVisitDirectionDto: UpdateVisitDirectionDto) {
    try {
      const visitDirection = await this.findOne(id);

      await visitDirection.visit_direction.update(updateVisitDirectionDto);

      if (!visitDirection.visit_direction.status) {
        const visit = await this.repoVisit.findOne({
          where: { id: updateVisitDirectionDto.visit_id },
        });

        if (!visit) {
          throw new BadRequestException('Visit not found');
        }

        interface AmountItem {
          total_amount: number;
          [key: string]: number;
        }

        let amount = 0;

        const updatedAmount = visit.amount.map((amountItem: AmountItem) => {
          const serviceId = visitDirection.visit_direction.service_id;

          if (serviceId in amountItem) {
            const serviceAmount = amountItem[serviceId];
            const newTotalAmount = amountItem.total_amount - serviceAmount;
            amount = newTotalAmount;

            const { [serviceId]: _, ...rest } = amountItem;

            return { total_amount: newTotalAmount, ...rest };
          }

          return amountItem;
        });

        updatedAmount[0].total_amount = amount;

        await visit.update({ amount: updatedAmount });
      }

      return {
        message: 'Visit direction updated successfully',
        visit_direction: visitDirection.visit_direction,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update visit direction. Please try again later',
        error,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.repo.destroy({ where: { id } });
      return {
        message: 'Visit direction deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete visit direction. Please try again later',
        error,
      );
    }
  }
}

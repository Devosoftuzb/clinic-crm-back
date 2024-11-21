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

      await visit.update({ total_amount: totalPrice });

      return {
        message: 'Visit direction created successfully',
        visit_direction,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create visit direction. Please try again later',
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
      );
    }
  }

  async update(id: number, updateVisitDirectionDto: UpdateVisitDirectionDto) {
    try {
      const visit_direction = await this.findOne(id);
      await visit_direction.visit_direction.update(updateVisitDirectionDto);
      return {
        message: 'Visit direction updated successfully',
        visit_direction: visit_direction.visit_direction,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update visit direction. Please try again later',
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
      );
    }
  }
}

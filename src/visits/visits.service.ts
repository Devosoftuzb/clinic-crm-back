import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Visit } from './models/visit.model';
import { Op, where } from 'sequelize';

@Injectable()
export class VisitsService {
  constructor(@InjectModel(Visit) private repo: typeof Visit) {}

  async create(clinic_id: string, createVisitDto: CreateVisitDto) {
    try {
      if (clinic_id !== createVisitDto.clinic_id) {
        throw new BadRequestException(
          'Clinic ID does not match the provided visit clinic ID',
        );
      }

      const firstVisit = await this.repo.findOne({
        where: {
          clinic_id: clinic_id,
          client_id: createVisitDto.client_id,
        },
        order: [['createdAt', 'ASC']],
      });

      if (!firstVisit) {
        createVisitDto.discount = 0;
      } else {
        const firstVisitDate = new Date(firstVisit.createdAt);
        const oneYearAfterFirstVisit = new Date(firstVisitDate);
        oneYearAfterFirstVisit.setFullYear(firstVisitDate.getFullYear() + 1);

        const visits = await this.repo.findAll({
          where: {
            clinic_id: clinic_id,
            client_id: createVisitDto.client_id,
            createdAt: {
              [Op.gte]: firstVisitDate,
              [Op.lte]: oneYearAfterFirstVisit,
            },
          },
        });

        let discount = 0;
        if (visits.length == 1) {
          discount = 5;
        } else if (visits.length >= 2) {
          discount = 10;
        }

        createVisitDto.discount = discount;
      }

      const visit = await this.repo.create(createVisitDto);

      if (visit.room_id !== null) {
        const visitUpdate = await this.repo.update(
          { total_amount: visit.room.price, ...createVisitDto },
          { where: { id: visit.id } },
        );
        return {
          message: 'Visit created successfully',
          visitUpdate,
        };
      } else {
        return {
          message: 'Visit created successfully',
          visit,
        };
      }
    } catch (error) {
      throw new BadRequestException(
        'Failed to create visit. Please try again later',
      );
    }
  }

  async findAll(clinic_id: string) {
    try {
      const visits = await this.repo.findAll({ where: { clinic_id } });
      if (!visits || visits.length === 0) {
        throw new NotFoundException(
          'No visits found for the specified clinic ID',
        );
      }
      return {
        message: 'Visits retrieved successfully',
        visits,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve visits. Please try again later',
      );
    }
  }

  async paginate(clinic_id: string, page: number): Promise<object> {
    try {
      page = Number(page);
      const limit = 15;
      const offset = (page - 1) * limit;

      const visits = await this.repo.findAll({
        where: { clinic_id },
        offset,
        limit,
      });

      if (!visits || visits.length === 0) {
        throw new NotFoundException(
          'No visits found for the specified clinic ID',
        );
      }

      const total_count = await this.repo.count({ where: { clinic_id } });
      const total_pages = Math.ceil(total_count / limit);
      return {
        status: 200,
        message: 'Visits retrieved successfully',
        data: {
          records: visits,
          pagination: {
            currentPage: page,
            total_pages,
            total_count,
          },
        },
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve visits. Please try again later',
      );
    }
  }

  async paginateOneDayVisit(clinic_id: string, page: number): Promise<object> {
    try {
      page = Number(page);
      const limit = 15;
      const offset = (page - 1) * limit;

      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const visits = await this.repo.findAll({
        where: {
          clinic_id,
          createdAt: {
            [Op.between]: [startOfDay, endOfDay],
          },
        },
        offset,
        limit,
        order: [['createdAt', 'DESC']],
      });

      if (!visits || visits.length === 0) {
        throw new NotFoundException(
          'No visits found for the specified clinic ID',
        );
      }

      const total_count = await this.repo.count({
        where: {
          clinic_id,
          createdAt: {
            [Op.between]: [startOfDay, endOfDay],
          },
        },
      });

      const total_pages = Math.ceil(total_count / limit);
      return {
        status: 200,
        message: 'Visits retrieved successfully',
        data: {
          records: visits,
          pagination: {
            currentPage: page,
            total_pages,
            total_count,
          },
        },
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve visits. Please try again later',
      );
    }
  }

  async findOne(clinic_id: string, id: number) {
    try {
      const visit = await this.repo.findOne({
        where: { id, clinic_id },
        include: { all: true },
      });

      if (!visit) {
        throw new NotFoundException(
          `Visit with id ${id} not found in clinic ${clinic_id}`,
        );
      }

      return {
        message: 'Visit retrieved successfully',
        visit,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve visits. Please try again later',
      );
    }
  }

  async update(clinic_id: string, id: number, updateVisitDto: UpdateVisitDto) {
    try {
      const visit = await this.findOne(clinic_id, id);
      await visit.visit.update(updateVisitDto);
      return {
        message: 'Visit updated successfully',
        visit: visit.visit,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update visit. Please try again later',
      );
    }
  }

  async remove(clinic_id: string, id: number) {
    try {
      await this.repo.destroy({ where: { clinic_id, id } });
      return {
        message: 'Visit deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete visit. Please try again later',
      );
    }
  }
}

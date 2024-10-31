import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Visit } from './models/visit.model';

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
      const visit = await this.repo.create(createVisitDto);
      return {
        message: 'Visit created successfully',
        visit,
      };
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
      const visit = await this.findOne(clinic_id, id);
      await visit.visit.destroy();
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

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Direction } from './models/direction.model';

@Injectable()
export class DirectionsService {
  constructor(@InjectModel(Direction) private repo: typeof Direction) {}

  async create(clinic_id: string, createDirectionDto: CreateDirectionDto) {
    try {
      if (clinic_id !== createDirectionDto.clinic_id) {
        throw new BadRequestException(
          'Clinic ID does not match the provided direction clinic ID',
        );
      }
      const direction = await this.repo.create(createDirectionDto);
      return {
        message: 'Direction created successfully',
        direction,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create direction. Please try again later',
      );
    }
  }

  async findAll(clinic_id: string) {
    try {
      const directions = await this.repo.findAll({ where: { clinic_id } });
      if (!directions || directions.length === 0) {
        throw new NotFoundException(
          'No directions found for the specified clinic ID',
        );
      }
      return {
        message: 'Directions retrieved successfully',
        directions,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve directions. Please try again later',
      );
    }
  }

  async paginate(clinic_id: string, page: number): Promise<object> {
    try {
      page = Number(page);
      const limit = 15;
      const offset = (page - 1) * limit;
      
      const directions = await this.repo.findAll({
        where: { clinic_id },
        offset,
        limit,
      });

      if (!directions || directions.length === 0) {
        throw new NotFoundException(
          'No directions found for the specified clinic ID',
        );
      }

      const total_count = await this.repo.count({ where: { clinic_id } });
      const total_pages = Math.ceil(total_count / limit);
      return {
        status: 200,
        message: 'Directions retrieved successfully',
        data: {
          records: directions,
          pagination: {
            currentPage: page,
            total_pages,
            total_count,
          },
        },
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve directions. Please try again later',
      );
    }
  }

  async findOne(clinic_id: string, id: number) {
    try {
      const direction = await this.repo.findOne({
        where: { id, clinic_id },
        include: { all: true },
      });

      if (!direction) {
        throw new NotFoundException(
          `Direction with id ${id} not found in clinic ${clinic_id}`,
        );
      }

      return {
        message: 'Direction retrieved successfully',
        direction,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve directions. Please try again later',
      );
    }
  }

  async update(
    clinic_id: string,
    id: number,
    updateDirectionDto: UpdateDirectionDto,
  ) {
    try {
      const direction = await this.findOne(clinic_id, id);
      await direction.direction.update(updateDirectionDto);
      return {
        message: 'Direction updated successfully',
        direction: direction.direction,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update direction. Please try again later',
      );
    }
  }

  async remove(clinic_id: string, id: number) {
    try {
      const direction = await this.findOne(clinic_id, id);
      await direction.direction.destroy();
      return {
        message: 'Direction deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete direction. Please try again later',
      );
    }
  }
}

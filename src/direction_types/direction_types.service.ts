import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDirectionTypeDto } from './dto/create-direction_type.dto';
import { UpdateDirectionTypeDto } from './dto/update-direction_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DirectionType } from './models/direction_types.model';

@Injectable()
export class DirectionTypesService {
  constructor(@InjectModel(DirectionType) private repo: typeof DirectionType) {}

  async create(createDirectionTypeDto: CreateDirectionTypeDto) {
    try {
      const direction_type = await this.repo.create(createDirectionTypeDto);
      return {
        message: 'Direction type created successfully',
        direction_type,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create direction type. Please try again later',
      );
    }
  }

  async findAll() {
    try {
      const direction_types = await this.repo.findAll();
      return {
        message: 'Direction types retrieved successfully',
        direction_types,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve direction types. Please try again later',
      );
    }
  }

  async paginate(page: number): Promise<object> {
    try {
      page = Number(page);
      const limit = 15;
      const offset = (page - 1) * limit;
      const direction_types = await this.repo.findAll({ offset, limit });
      const total_count = await this.repo.count();
      const total_pages = Math.ceil(total_count / limit);
      return {
        status: 200,
        message: 'Direction types retrieved successfully',
        data: {
          records: direction_types,
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
      const direction_type = await this.repo.findByPk(id, {
        include: { all: true },
      });
      if (!direction_type) {
        throw new BadRequestException(`Direction type with id ${id} not found`);
      }
      return {
        message: 'Direction type retrieved successfully',
        direction_type,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve direction type. Please try again later',
      );
    }
  }

  async update(id: number, updateDirectionTypeDto: UpdateDirectionTypeDto) {
    try {
      const direction_type = await this.findOne(id);
      await direction_type.direction_type.update(updateDirectionTypeDto);
      return {
        message: 'Direction type updated successfully',
        direction_type: direction_type.direction_type,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update direction type. Please try again later',
      );
    }
  }

  async remove(id: number) {
    try {
      await this.repo.destroy({ where: { id } });
      return {
        message: 'Direction type deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete direction type. Please try again later',
      );
    }
  }
}

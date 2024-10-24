import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Direction } from './models/direction.model';

@Injectable()
export class DirectionsService {
  constructor(@InjectModel(Direction) private repo: typeof Direction) {}

  async create(createDirectionDto: CreateDirectionDto) {
    try {
      const direction = await this.repo.create(createDirectionDto);
      return {
        message: 'Direction created successfully',
        direction,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const directions = await this.repo.findAll();
      return {
        message: 'Directions retrieved successfully',
        directions,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async paginate(page: number): Promise<object> {
    try {
      page = Number(page);
      const limit = 15;
      const offset = (page - 1) * limit;
      const directions = await this.repo.findAll({ offset, limit });
      const total_count = await this.repo.count();
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
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const direction = await this.repo.findByPk(id, {
        include: { all: true },
      });
      if (!direction) {
        throw new BadRequestException(`Direction with id ${id} not found`);
      }
      return {
        message: 'Direction retrieved successfully',
        direction,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateDirectionDto: UpdateDirectionDto) {
    try {
      const direction = await this.findOne(id);
      await direction.direction.update(updateDirectionDto);
      return {
        message: 'Direction updated successfully',
        direction: direction.direction,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const direction = await this.findOne(id);
      await direction.direction.destroy();
      return {
        message: 'Direction deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

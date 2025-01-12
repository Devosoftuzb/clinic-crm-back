import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTheadDto } from './dto/create-thead.dto';
import { UpdateTheadDto } from './dto/update-thead.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Thead } from './models/thead.model';

@Injectable()
export class TheadService {
  constructor(@InjectModel(Thead) private repo: typeof Thead) {}

  async create(clinic_id: string, createTheadDto: CreateTheadDto) {
    try {
      if (clinic_id !== createTheadDto.clinic_id) {
        throw new BadRequestException(
          'Clinic ID does not match the provided thead clinic ID', 
        );
      }
      const thead = await this.repo.create(createTheadDto);
      return {
        message: 'Thead created successfully',
        thead,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create thead. Please try again later', error
      );
    }
  }

  async findAll(clinic_id: string) {
    try {
      const theads = await this.repo.findAll({ where: { clinic_id } });
      if (!theads || theads.length === 0) {
        throw new NotFoundException(
          'No theads found for the specified clinic ID',
        );
      }
      return {
        message: 'Thead retrieved successfully',
        theads,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve theads. Please try again later', error
      );
    }
  }

  async paginate(clinic_id: string, page: number): Promise<object> {
    try {
      page = Number(page);
      const limit = 15;
      const offset = (page - 1) * limit;

      const theads = await this.repo.findAll({
        where: { clinic_id },
        offset,
        limit,
      });

      if (!theads || theads.length === 0) {
        throw new NotFoundException(
          'No theads found for the specified clinic ID',
        );
      }

      const total_count = await this.repo.count({ where: { clinic_id } });
      const total_pages = Math.ceil(total_count / limit);
      return {
        status: 200,
        message: 'Thead retrieved successfully',
        data: {
          records: theads,
          pagination: {
            currentPage: page,
            total_pages,
            total_count,
          },
        },
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve theads. Please try again later', error
      );
    }
  }

  async findOne(clinic_id: string, id: number) {
    try {
      const thead = await this.repo.findOne({
        where: { id, clinic_id },
        include: { all: true },
      });

      if (!thead) {
        throw new NotFoundException(
          `Thead with id ${id} not found in clinic ${clinic_id}`,
        );
      }

      return {
        message: 'Thead retrieved successfully',
        thead,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve theads. Please try again later', error
      );
    }
  }

  async update(clinic_id: string, id: number, updateTheadDto: UpdateTheadDto) {
    try {
      const thead = await this.findOne(clinic_id, id);
      await thead.thead.update(updateTheadDto);
      return {
        message: 'Thead updated successfully',
        thead: thead.thead,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update thead. Please try again later', error
      );
    }
  }

  async remove(clinic_id: string, id: number) {
    try {
      await this.repo.destroy({ where: { clinic_id, id } });
      return {
        message: 'Thead deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete thead. Please try again later', error
      );
    }
  }
}

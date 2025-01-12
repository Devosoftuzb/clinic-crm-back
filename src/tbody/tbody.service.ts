import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTbodyDto } from './dto/create-tbody.dto';
import { UpdateTbodyDto } from './dto/update-tbody.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tbody } from './models/tbody.model';

@Injectable()
export class TbodyService {
  constructor(@InjectModel(Tbody) private repo: typeof Tbody) {}

  async create(createTbodyDto: CreateTbodyDto) {
    try {
      const thead = await this.repo.create(createTbodyDto);
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

  async findAll() {
    try {
      const theads = await this.repo.findAll();
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

  async paginate(page: number): Promise<object> {
    try {
      page = Number(page);
      const limit = 15;
      const offset = (page - 1) * limit;

      const theads = await this.repo.findAll({
        offset,
        limit,
      });

      const total_count = await this.repo.count();
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

  async findOne(id: number) {
    try {
      const thead = await this.repo.findOne({
        where: { id },
        include: { all: true },
      });

      if (!thead) {
        throw new NotFoundException(`Thead with id ${id} not found`);
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

  async update(id: number, updateTbodyDto: UpdateTbodyDto) {
    try {
      const thead = await this.findOne(id);
      await thead.thead.update(updateTbodyDto);
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

  async remove(id: number) {
    try {
      await this.repo.destroy({ where: { id } });
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

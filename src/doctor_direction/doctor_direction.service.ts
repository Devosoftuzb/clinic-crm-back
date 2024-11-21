import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDoctorDirectionDto } from './dto/create-doctor_direction.dto';
import { UpdateDoctorDirectionDto } from './dto/update-doctor_direction.dto';
import { InjectModel } from '@nestjs/sequelize';
import { DoctorDirection } from './models/doctor_direction.model';

@Injectable()
export class DoctorDirectionService {
  constructor(
    @InjectModel(DoctorDirection) private repo: typeof DoctorDirection,
  ) {}

  async create(createDoctorDirectionDto: CreateDoctorDirectionDto) {
    try {
      const doctor_direction = await this.repo.create(createDoctorDirectionDto);
      return {
        message: 'Doctor direction created successfully',
        doctor_direction,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create doctor direction. Please try again later',
      );
    }
  }

  async findAll() {
    try {
      const doctor_directions = await this.repo.findAll();
      return {
        message: 'Doctor directions retrieved successfully',
        doctor_directions,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve doctor directions. Please try again later',
      );
    }
  }

  async paginate(page: number): Promise<object> {
    try {
      page = Number(page);
      const limit = 15;
      const offset = (page - 1) * limit;
      const doctor_directions = await this.repo.findAll({ offset, limit });
      const total_count = await this.repo.count();
      const total_pages = Math.ceil(total_count / limit);
      return {
        status: 200,
        message: 'Doctor directions retrieved successfully',
        data: {
          records: doctor_directions,
          pagination: {
            currentPage: page,
            total_pages,
            total_count,
          },
        },
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve doctor directions. Please try again later',
      );
    }
  }

  async findOne(id: number) {
    try {
      const doctor_direction = await this.repo.findByPk(id, {
        include: { all: true },
      });
      if (!doctor_direction) {
        throw new BadRequestException(
          `Doctor direction with id ${id} not found`,
        );
      }
      return {
        message: 'Doctor direction retrieved successfully',
        doctor_direction,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve doctor direction. Please try again later',
      );
    }
  }

  async update(id: number, updateDoctorDirectionDto: UpdateDoctorDirectionDto) {
    try {
      const doctor_direction = await this.findOne(id);
      await doctor_direction.doctor_direction.update(updateDoctorDirectionDto);
      return {
        message: 'Doctor direction updated successfully',
        doctor_direction: doctor_direction.doctor_direction,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update doctor direction. Please try again later',
      );
    }
  }

  async remove(id: number) {
    try {
      await this.repo.destroy({ where: { id } });
      return {
        message: 'Doctor direction deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete doctor direction. Please try again later',
      );
    }
  }
}

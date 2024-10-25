import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Clinic } from './models/clinic.model';

@Injectable()
export class ClinicService {
  constructor(@InjectModel(Clinic) private repo: typeof Clinic) {}

  async create(createClinicDto: CreateClinicDto) {
    try {
      const clinic = await this.repo.create(createClinicDto);
      return {
        message: 'Clinic created successfully',
        clinic,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create clinic. Please try again later',
      );
    }
  }

  async findAll() {
    try {
      const clinics = await this.repo.findAll();
      return {
        message: 'Clinics retrieved successfully',
        clinics,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve clinics. Please try again later',
      );
    }
  }

  async paginate(page: number): Promise<object> {
    try {
      page = Number(page);
      const limit = 15;
      const offset = (page - 1) * limit;
      const clinics = await this.repo.findAll({ offset, limit });
      const total_count = await this.repo.count();
      const total_pages = Math.ceil(total_count / limit);
      return {
        status: 200,
        message: 'Clinics retrieved successfully',
        data: {
          records: clinics,
          pagination: {
            currentPage: page,
            total_pages,
            total_count,
          },
        },
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve clinics. Please try again later',
      );
    }
  }

  async findOne(id: string) {
    try {
      const clinic = await this.repo.findByPk(id, { include: { all: true } });
      if (!clinic) {
        throw new NotFoundException(`Clinic with id ${id} not found`);
      }
      return {
        message: 'Clinic retrieved successfully',
        clinic,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve clinic. Please try again later',
      );
    }
  }

  async update(id: string, updateClinicDto: UpdateClinicDto) {
    try {
      const clinic = await this.findOne(id);
      await clinic.clinic.update(updateClinicDto);
      return {
        message: 'Clinic updated successfully',
        clinic: clinic.clinic,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update clinic. Please try again later',
      );
    }
  }

  async remove(id: string) {
    try {
      const clinic = await this.findOne(id);
      await clinic.clinic.destroy();
      return {
        message: 'Clinic deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete clinic. Please try again later',
      );
    }
  }
}

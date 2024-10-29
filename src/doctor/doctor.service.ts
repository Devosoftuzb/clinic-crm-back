import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from 'src/employees/models/employee.model';
import { User } from 'src/user/models/user.model';
import { Doctor } from './models/doctor.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor) private repoDoctor: typeof Doctor,
    @InjectModel(Employee) private repoEmployee: typeof Employee,
    @InjectModel(User) private repoUser: typeof User,
  ) {}

  private async checkExistingUser(login: string) {
    const doctorExists = await this.repoDoctor.findOne({ where: { login } });
    const employeeExists = await this.repoEmployee.findOne({
      where: { login },
    });
    const userExists = await this.repoUser.findOne({ where: { login } });
    return userExists || employeeExists || doctorExists;
  }

  async create(clinic_id: string, createDoctorDto: CreateDoctorDto) {
    try {
      if (clinic_id !== createDoctorDto.clinic_id) {
        throw new BadRequestException(
          'Clinic ID does not match the provided client clinic ID',
        );
      }

      const existingUser = await this.checkExistingUser(createDoctorDto.login);

      if (existingUser) {
        throw new BadRequestException(
          `This login "${createDoctorDto.login}" already exists`,
        );
      }
      const hashedPassword = await bcrypt.hash(createDoctorDto.password, 7);
      const doctor = await this.repoDoctor.create({
        ...createDoctorDto,
        hashed_password: hashedPassword,
      });
      return {
        message: 'Doctor created successfully',
        doctor,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create doctor. Please try again later',
      );
    }
  }

  async findAll(clinic_id: string) {
    try {
      const doctors = await this.repoDoctor.findAll({
        where: { clinic_id },
      });
      if (!doctors || doctors.length === 0) {
        throw new NotFoundException(
          'No doctors found for the specified clinic ID',
        );
      }
      return {
        message: 'Doctors retrieved successfully',
        doctors,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve doctors. Please try again later',
      );
    }
  }

  async paginate(clinic_id: string, page: number): Promise<object> {
    try {
      page = Number(page);
      const limit = 15;
      const offset = (page - 1) * limit;

      const doctors = await this.repoDoctor.findAll({
        where: { clinic_id },
        offset,
        limit,
      });

      if (!doctors || doctors.length === 0) {
        throw new NotFoundException(
          'No doctors found for the specified clinic ID',
        );
      }

      const total_count = await this.repoDoctor.count({
        where: { clinic_id },
      });
      const total_pages = Math.ceil(total_count / limit);
      return {
        status: 200,
        message: 'Doctors retrieved successfully',
        data: {
          records: doctors,
          pagination: {
            currentPage: page,
            total_pages,
            total_count,
          },
        },
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve doctors. Please try again later',
      );
    }
  }

  async findOne(clinic_id: string, id: string) {
    try {
      const doctor = await this.repoDoctor.findOne({
        where: { id, clinic_id },
        include: { all: true },
      });
      if (!doctor) {
        throw new NotFoundException(
          `Doctor with id ${id} not found in clinic ${clinic_id}`,
        );
      }
      return {
        message: 'Doctor retrieved successfully',
        doctor,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve doctor. Please try again later',
      );
    }
  }

  async update(
    clinic_id: string,
    id: string,
    updateDoctorDto: UpdateDoctorDto,
  ) {
    try {
      const doctor = await this.findOne(clinic_id, id);

      const existingUser = await this.checkExistingUser(updateDoctorDto.login);

      if (existingUser) {
        throw new BadRequestException(
          `This login "${updateDoctorDto.login}" already exists`,
        );
      }

      await doctor.doctor.update(updateDoctorDto);
      return {
        message: 'Doctor updated successfully',
        doctor: doctor.doctor,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update doctor. Please try again later',
      );
    }
  }

  async remove(clinic_id: string, id: string) {
    try {
      const doctor = await this.findOne(clinic_id, id);
      await doctor.doctor.destroy();
      return {
        message: 'Doctor deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete doctor. Please try again later',
      );
    }
  }
}

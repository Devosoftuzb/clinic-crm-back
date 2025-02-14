import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './models/employee.model';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/models/user.model';
import { Doctor } from 'src/doctor/models/doctor.model';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee) private repoEmployee: typeof Employee,
    @InjectModel(User) private repoUser: typeof User,
    @InjectModel(Doctor) private repoDoctor: typeof Doctor,
  ) {}

  private async checkExistingUser(login: string) {
    const doctorExists = await this.repoDoctor.findOne({ where: { login } });
    const employeeExists = await this.repoEmployee.findOne({
      where: { login },
    });
    const userExists = await this.repoUser.findOne({ where: { login } });
    return userExists || employeeExists || doctorExists;
  }

  async create(clinic_id: string, createEmployeeDto: CreateEmployeeDto) {
    try {
      if (clinic_id !== createEmployeeDto.clinic_id) {
        throw new BadRequestException(
          'Clinic ID does not match the provided client clinic ID',
        );
      }

      const existingUser = await this.checkExistingUser(
        createEmployeeDto.login,
      );

      if (existingUser) {
        throw new BadRequestException(
          `This login "${createEmployeeDto.login}" already exists`,
        );
      }
      const hashedPassword = await bcrypt.hash(createEmployeeDto.password, 7);
      const employee = await this.repoEmployee.create({
        ...createEmployeeDto,
        hashed_password: hashedPassword,
      });
      return {
        message: 'Employee created successfully',
        employee,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create employee. Please try again later',
        error,
      );
    }
  }

  async findAll(clinic_id: string) {
    try {
      const employees = await this.repoEmployee.findAll({
        where: { clinic_id },
      });
      if (!employees || employees.length === 0) {
        throw new NotFoundException(
          'No employees found for the specified clinic ID',
        );
      }
      return {
        message: 'Employees retrieved successfully',
        employees,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve employees. Please try again later',
        error,
      );
    }
  }

  async paginate(clinic_id: string, page: number): Promise<object> {
    try {
      page = Number(page);
      const limit = 15;
      const offset = (page - 1) * limit;

      const employees = await this.repoEmployee.findAll({
        where: { clinic_id },
        offset,
        limit,
      });

      if (!employees || employees.length === 0) {
        throw new NotFoundException(
          'No employees found for the specified clinic ID',
        );
      }

      const total_count = await this.repoEmployee.count({
        where: { clinic_id },
      });
      const total_pages = Math.ceil(total_count / limit);
      return {
        status: 200,
        message: 'Employees retrieved successfully',
        data: {
          records: employees,
          pagination: {
            currentPage: page,
            total_pages,
            total_count,
          },
        },
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve employees. Please try again later',
        error,
      );
    }
  }

  async findOne(clinic_id: string, id: string) {
    try {
      const employee = await this.repoEmployee.findOne({
        where: { id, clinic_id },
        include: { all: true },
      });
      if (!employee) {
        throw new NotFoundException(
          `Employee with id ${id} not found in clinic ${clinic_id}`,
        );
      }
      return {
        message: 'Employee retrieved successfully',
        employee,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve employee. Please try again later',
        error,
      );
    }
  }

  async update(
    clinic_id: string,
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ) {
    try {
      const employee = await this.findOne(clinic_id, id);

      if (updateEmployeeDto.login !== employee.employee.login) {
        const existingUser = await this.checkExistingUser(
          updateEmployeeDto.login,
        );
        if (existingUser) {
          throw new BadRequestException(
            `This login "${updateEmployeeDto.login}" already exists`,
          );
        }
      }

      await employee.employee.update(updateEmployeeDto);
      return {
        message: 'Employee updated successfully',
        employee: employee.employee,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update employee. Please try again later',
        error,
      );
    }
  }

  async remove(clinic_id: string, id: string) {
    try {
      await this.repoEmployee.destroy({ where: { clinic_id, id } });
      return {
        message: 'Employee deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete employee. Please try again later',
        error,
      );
    }
  }
}

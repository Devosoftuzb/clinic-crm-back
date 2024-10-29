import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { Employee } from 'src/employees/models/employee.model';
import { Doctor } from 'src/doctor/models/doctor.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private repo: typeof User,
    @InjectModel(Employee) private repoEmployee: typeof Employee,
    @InjectModel(Doctor) private repoDoctor: typeof Doctor,
  ) {}

  async onModuleInit() {
    try {
      const existingSuperAdmin = await this.repo.findOne({
        where: { role: 'superadmin' },
      });
      if (!existingSuperAdmin) {
        const hashedPassword = await bcrypt.hash('0qwertydev1', 7);
        const defaultSuperAdminDto = {
          full_name: 'Dev Dev',
          phone_number: '+998999999999',
          login: 'dev',
          hashed_password: hashedPassword,
          role: 'superadmin' as 'superadmin' | 'admin' | 'owner',
        };

        const createdUser = await this.repo.create(defaultSuperAdminDto);
        return {
          message: 'Super Admin created successfully',
          user: createdUser,
        };
      }
    } catch (error) {
      throw new BadRequestException(
        'Failed to initialize Super Admin. Please try again later',
      );
    }
  }

  private async checkExistingUser(login: string) {
    const doctorExists = await this.repoDoctor.findOne({ where: { login } });
    const employeeExists = await this.repoEmployee.findOne({
      where: { login },
    });
    const userExists = await this.repo.findOne({ where: { login } });
    return userExists || employeeExists || doctorExists;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.checkExistingUser(createUserDto.login);

      if (existingUser) {
        throw new BadRequestException(
          `This login "${createUserDto.login}" already exists`,
        );
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
      const user = await this.repo.create({
        ...createUserDto,
        hashed_password: hashedPassword,
      });
      return {
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create user. Please try again later',
      );
    }
  }

  async findAll() {
    try {
      const users = await this.repo.findAll();
      return {
        message: 'Users retrieved successfully',
        users,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve users. Please try again later',
      );
    }
  }

  async paginate(page: number): Promise<object> {
    try {
      page = Number(page);
      const limit = 15;
      const offset = (page - 1) * limit;
      const users = await this.repo.findAll({ offset, limit });
      const total_count = await this.repo.count();
      const total_pages = Math.ceil(total_count / limit);
      return {
        status: 200,
        message: 'Users retrieved successfully',
        data: {
          records: users,
          pagination: {
            currentPage: page,
            total_pages,
            total_count,
          },
        },
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve users. Please try again later',
      );
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.repo.findByPk(id, { include: { all: true } });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return {
        message: 'User retrieved successfully',
        user,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to retrieve user. Please try again later',
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);

      const existingUser = await this.checkExistingUser(updateUserDto.login);

      if (existingUser) {
        throw new BadRequestException(
          `This login "${updateUserDto.login}" already exists`,
        );
      }

      await user.user.update(updateUserDto);

      return {
        message: 'User updated successfully',
        user: user.user,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update user. Please try again later',
      );
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findOne(id);
      await user.user.destroy();
      return {
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete user. Please try again later',
      );
    }
  }
}

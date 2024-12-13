"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const employee_model_1 = require("./models/employee.model");
const bcrypt = require("bcrypt");
const user_model_1 = require("../user/models/user.model");
const doctor_model_1 = require("../doctor/models/doctor.model");
let EmployeesService = class EmployeesService {
    constructor(repoEmployee, repoUser, repoDoctor) {
        this.repoEmployee = repoEmployee;
        this.repoUser = repoUser;
        this.repoDoctor = repoDoctor;
    }
    async checkExistingUser(login) {
        const doctorExists = await this.repoDoctor.findOne({ where: { login } });
        const employeeExists = await this.repoEmployee.findOne({
            where: { login },
        });
        const userExists = await this.repoUser.findOne({ where: { login } });
        return userExists || employeeExists || doctorExists;
    }
    async create(clinic_id, createEmployeeDto) {
        try {
            if (clinic_id !== createEmployeeDto.clinic_id) {
                throw new common_1.BadRequestException('Clinic ID does not match the provided client clinic ID');
            }
            const existingUser = await this.checkExistingUser(createEmployeeDto.login);
            if (existingUser) {
                throw new common_1.BadRequestException(`This login "${createEmployeeDto.login}" already exists`);
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create employee. Please try again later');
        }
    }
    async findAll(clinic_id) {
        try {
            const employees = await this.repoEmployee.findAll({
                where: { clinic_id },
            });
            if (!employees || employees.length === 0) {
                throw new common_1.NotFoundException('No employees found for the specified clinic ID');
            }
            return {
                message: 'Employees retrieved successfully',
                employees,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve employees. Please try again later');
        }
    }
    async paginate(clinic_id, page) {
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
                throw new common_1.NotFoundException('No employees found for the specified clinic ID');
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve employees. Please try again later');
        }
    }
    async findOne(clinic_id, id) {
        try {
            const employee = await this.repoEmployee.findOne({
                where: { id, clinic_id },
                include: { all: true },
            });
            if (!employee) {
                throw new common_1.NotFoundException(`Employee with id ${id} not found in clinic ${clinic_id}`);
            }
            return {
                message: 'Employee retrieved successfully',
                employee,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve employee. Please try again later');
        }
    }
    async update(clinic_id, id, updateEmployeeDto) {
        try {
            const employee = await this.findOne(clinic_id, id);
            if (updateEmployeeDto.login !== employee.employee.login) {
                const existingUser = await this.checkExistingUser(updateEmployeeDto.login);
                if (existingUser) {
                    throw new common_1.BadRequestException(`This login "${updateEmployeeDto.login}" already exists`);
                }
            }
            await employee.employee.update(updateEmployeeDto);
            return {
                message: 'Employee updated successfully',
                employee: employee.employee,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update employee. Please try again later');
        }
    }
    async remove(clinic_id, id) {
        try {
            await this.repoEmployee.destroy({ where: { clinic_id, id } });
            return {
                message: 'Employee deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete employee. Please try again later');
        }
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(employee_model_1.Employee)),
    __param(1, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(2, (0, sequelize_1.InjectModel)(doctor_model_1.Doctor)),
    __metadata("design:paramtypes", [Object, Object, Object])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map
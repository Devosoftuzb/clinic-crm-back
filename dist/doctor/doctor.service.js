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
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const employee_model_1 = require("../employees/models/employee.model");
const user_model_1 = require("../user/models/user.model");
const doctor_model_1 = require("./models/doctor.model");
const bcrypt = require("bcrypt");
const sequelize_2 = require("sequelize");
let DoctorService = class DoctorService {
    constructor(repoDoctor, repoEmployee, repoUser) {
        this.repoDoctor = repoDoctor;
        this.repoEmployee = repoEmployee;
        this.repoUser = repoUser;
    }
    async checkExistingUser(login) {
        const doctorExists = await this.repoDoctor.findOne({ where: { login } });
        const employeeExists = await this.repoEmployee.findOne({
            where: { login },
        });
        const userExists = await this.repoUser.findOne({ where: { login } });
        return userExists || employeeExists || doctorExists;
    }
    async create(clinic_id, createDoctorDto) {
        try {
            if (clinic_id !== createDoctorDto.clinic_id) {
                throw new common_1.BadRequestException('Clinic ID does not match the provided client clinic ID');
            }
            const existingUser = await this.checkExistingUser(createDoctorDto.login);
            if (existingUser) {
                throw new common_1.BadRequestException(`This login "${createDoctorDto.login}" already exists`);
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
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('Failed to create doctor. Please try again later', error);
        }
    }
    async findAll(clinic_id) {
        try {
            const doctors = await this.repoDoctor.findAll({
                where: { clinic_id },
            });
            if (!doctors || doctors.length === 0) {
                throw new common_1.NotFoundException('No doctors found for the specified clinic ID');
            }
            return {
                message: 'Doctors retrieved successfully',
                doctors,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve doctors. Please try again later', error);
        }
    }
    async findClinicDoctors(clinic_id) {
        try {
            const doctors = await this.repoDoctor.findAll({
                where: {
                    clinic_id: clinic_id,
                    role: {
                        [sequelize_2.Op.or]: ['doctor', 'lab_technician'],
                    },
                },
            });
            if (!doctors || doctors.length === 0) {
                throw new common_1.NotFoundException('No doctors found for the specified clinic ID');
            }
            return {
                message: 'Doctors retrieved successfully',
                doctors,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve doctors. Please try again later', error);
        }
    }
    async findExternalDoctors(clinic_id) {
        try {
            const doctors = await this.repoDoctor.findAll({
                where: { clinic_id, role: 'external_doctor' },
            });
            if (!doctors || doctors.length === 0) {
                throw new common_1.NotFoundException('No doctors found for the specified clinic ID');
            }
            return {
                message: 'Doctors retrieved successfully',
                doctors,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve doctors. Please try again later', error);
        }
    }
    async paginate(clinic_id, page) {
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
                throw new common_1.NotFoundException('No doctors found for the specified clinic ID');
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve doctors. Please try again later', error);
        }
    }
    async findOne(clinic_id, id) {
        try {
            const doctor = await this.repoDoctor.findOne({
                where: { id, clinic_id },
                include: { all: true },
            });
            if (!doctor) {
                throw new common_1.NotFoundException(`Doctor with id ${id} not found in clinic ${clinic_id}`);
            }
            return {
                message: 'Doctor retrieved successfully',
                doctor,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve doctor. Please try again later', error);
        }
    }
    async update(clinic_id, id, updateDoctorDto) {
        try {
            const doctor = await this.findOne(clinic_id, id);
            if (updateDoctorDto.login !== doctor.doctor.login) {
                const existingUser = await this.checkExistingUser(updateDoctorDto.login);
                if (existingUser) {
                    throw new common_1.BadRequestException(`This login "${updateDoctorDto.login}" already exists`);
                }
            }
            await doctor.doctor.update(updateDoctorDto);
            return {
                message: 'Doctor updated successfully',
                doctor: doctor.doctor,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update doctor. Please try again later', error);
        }
    }
    async remove(clinic_id, id) {
        try {
            await this.repoDoctor.destroy({ where: { clinic_id, id } });
            return {
                message: 'Doctor deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete doctor. Please try again later', error);
        }
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(doctor_model_1.Doctor)),
    __param(1, (0, sequelize_1.InjectModel)(employee_model_1.Employee)),
    __param(2, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, Object, Object])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map
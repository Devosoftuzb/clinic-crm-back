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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./models/user.model");
const bcrypt = require("bcrypt");
const employee_model_1 = require("../employees/models/employee.model");
const doctor_model_1 = require("../doctor/models/doctor.model");
let UserService = class UserService {
    constructor(repo, repoEmployee, repoDoctor) {
        this.repo = repo;
        this.repoEmployee = repoEmployee;
        this.repoDoctor = repoDoctor;
    }
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
                    role: 'superadmin',
                };
                const createdUser = await this.repo.create(defaultSuperAdminDto);
                return {
                    message: 'Super Admin created successfully',
                    user: createdUser,
                };
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to initialize Super Admin. Please try again later');
        }
    }
    async checkExistingUser(login) {
        const doctorExists = await this.repoDoctor.findOne({ where: { login } });
        const employeeExists = await this.repoEmployee.findOne({
            where: { login },
        });
        const userExists = await this.repo.findOne({ where: { login } });
        return userExists || employeeExists || doctorExists;
    }
    async create(createUserDto) {
        try {
            const existingUser = await this.checkExistingUser(createUserDto.login);
            if (existingUser) {
                throw new common_1.BadRequestException(`This login "${createUserDto.login}" already exists`);
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create user. Please try again later');
        }
    }
    async findAll() {
        try {
            const users = await this.repo.findAll();
            return {
                message: 'Users retrieved successfully',
                users,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve users. Please try again later');
        }
    }
    async paginate(page) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve users. Please try again later');
        }
    }
    async findOne(id) {
        try {
            const user = await this.repo.findByPk(id, { include: { all: true } });
            if (!user) {
                throw new common_1.NotFoundException(`User with id ${id} not found`);
            }
            return {
                message: 'User retrieved successfully',
                user,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve user. Please try again later');
        }
    }
    async update(id, updateUserDto) {
        try {
            const user = await this.findOne(id);
            if (updateUserDto.login !== user.user.login) {
                const existingUser = await this.checkExistingUser(updateUserDto.login);
                if (existingUser) {
                    throw new common_1.BadRequestException(`This login "${updateUserDto.login}" already exists`);
                }
            }
            await user.user.update(updateUserDto);
            return {
                message: 'User updated successfully',
                user: user.user,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update user. Please try again later');
        }
    }
    async remove(id) {
        try {
            await this.repo.destroy({ where: { id } });
            return {
                message: 'User deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete user. Please try again later');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(employee_model_1.Employee)),
    __param(2, (0, sequelize_1.InjectModel)(doctor_model_1.Doctor)),
    __metadata("design:paramtypes", [Object, Object, Object])
], UserService);
//# sourceMappingURL=user.service.js.map
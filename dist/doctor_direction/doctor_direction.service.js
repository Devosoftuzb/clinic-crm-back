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
exports.DoctorDirectionService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const doctor_direction_model_1 = require("./models/doctor_direction.model");
let DoctorDirectionService = class DoctorDirectionService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(createDoctorDirectionDto) {
        try {
            const doctor_direction = await this.repo.create(createDoctorDirectionDto);
            return {
                message: 'Doctor direction created successfully',
                doctor_direction,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create doctor direction. Please try again later');
        }
    }
    async findAll() {
        try {
            const doctor_directions = await this.repo.findAll();
            return {
                message: 'Doctor directions retrieved successfully',
                doctor_directions,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve doctor directions. Please try again later');
        }
    }
    async paginate(page) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve doctor directions. Please try again later');
        }
    }
    async findOne(id) {
        try {
            const doctor_direction = await this.repo.findByPk(id, {
                include: { all: true },
            });
            if (!doctor_direction) {
                throw new common_1.BadRequestException(`Doctor direction with id ${id} not found`);
            }
            return {
                message: 'Doctor direction retrieved successfully',
                doctor_direction,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve doctor direction. Please try again later');
        }
    }
    async update(id, updateDoctorDirectionDto) {
        try {
            const doctor_direction = await this.findOne(id);
            await doctor_direction.doctor_direction.update(updateDoctorDirectionDto);
            return {
                message: 'Doctor direction updated successfully',
                doctor_direction: doctor_direction.doctor_direction,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update doctor direction. Please try again later');
        }
    }
    async remove(id) {
        try {
            await this.repo.destroy({ where: { id } });
            return {
                message: 'Doctor direction deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete doctor direction. Please try again later');
        }
    }
};
exports.DoctorDirectionService = DoctorDirectionService;
exports.DoctorDirectionService = DoctorDirectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(doctor_direction_model_1.DoctorDirection)),
    __metadata("design:paramtypes", [Object])
], DoctorDirectionService);
//# sourceMappingURL=doctor_direction.service.js.map
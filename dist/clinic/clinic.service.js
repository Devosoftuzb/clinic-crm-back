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
exports.ClinicService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const clinic_model_1 = require("./models/clinic.model");
let ClinicService = class ClinicService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(createClinicDto) {
        try {
            const clinic = await this.repo.create(createClinicDto);
            return {
                message: 'Clinic created successfully',
                clinic,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create clinic. Please try again later');
        }
    }
    async findAll() {
        try {
            const clinics = await this.repo.findAll();
            return {
                message: 'Clinics retrieved successfully',
                clinics,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve clinics. Please try again later');
        }
    }
    async paginate(page) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve clinics. Please try again later');
        }
    }
    async findOne(id) {
        try {
            const clinic = await this.repo.findByPk(id, { include: { all: true } });
            if (!clinic) {
                throw new common_1.NotFoundException(`Clinic with id ${id} not found`);
            }
            return {
                message: 'Clinic retrieved successfully',
                clinic,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve clinic. Please try again later');
        }
    }
    async update(id, updateClinicDto) {
        try {
            const clinic = await this.findOne(id);
            await clinic.clinic.update(updateClinicDto);
            return {
                message: 'Clinic updated successfully',
                clinic: clinic.clinic,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update clinic. Please try again later');
        }
    }
    async remove(id) {
        try {
            const clinic = await this.findOne(id);
            await clinic.clinic.destroy();
            return {
                message: 'Clinic deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete clinic. Please try again later');
        }
    }
};
exports.ClinicService = ClinicService;
exports.ClinicService = ClinicService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(clinic_model_1.Clinic)),
    __metadata("design:paramtypes", [Object])
], ClinicService);
//# sourceMappingURL=clinic.service.js.map
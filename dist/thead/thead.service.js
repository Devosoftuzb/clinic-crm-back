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
exports.TheadService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const thead_model_1 = require("./models/thead.model");
let TheadService = class TheadService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(clinic_id, createTheadDto) {
        try {
            if (clinic_id !== createTheadDto.clinic_id) {
                throw new common_1.BadRequestException('Clinic ID does not match the provided thead clinic ID');
            }
            const thead = await this.repo.create(createTheadDto);
            return {
                message: 'Thead created successfully',
                thead,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create thead. Please try again later', error);
        }
    }
    async findAll(clinic_id) {
        try {
            const theads = await this.repo.findAll({ where: { clinic_id } });
            if (!theads || theads.length === 0) {
                throw new common_1.NotFoundException('No theads found for the specified clinic ID');
            }
            return {
                message: 'Thead retrieved successfully',
                theads,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve theads. Please try again later', error);
        }
    }
    async paginate(clinic_id, page) {
        try {
            page = Number(page);
            const limit = 15;
            const offset = (page - 1) * limit;
            const theads = await this.repo.findAll({
                where: { clinic_id },
                offset,
                limit,
            });
            if (!theads || theads.length === 0) {
                throw new common_1.NotFoundException('No theads found for the specified clinic ID');
            }
            const total_count = await this.repo.count({ where: { clinic_id } });
            const total_pages = Math.ceil(total_count / limit);
            return {
                status: 200,
                message: 'Thead retrieved successfully',
                data: {
                    records: theads,
                    pagination: {
                        currentPage: page,
                        total_pages,
                        total_count,
                    },
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve theads. Please try again later', error);
        }
    }
    async findOne(clinic_id, id) {
        try {
            const thead = await this.repo.findOne({
                where: { id, clinic_id },
                include: { all: true },
            });
            if (!thead) {
                throw new common_1.NotFoundException(`Thead with id ${id} not found in clinic ${clinic_id}`);
            }
            return {
                message: 'Thead retrieved successfully',
                thead,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve theads. Please try again later', error);
        }
    }
    async update(clinic_id, id, updateTheadDto) {
        try {
            const thead = await this.findOne(clinic_id, id);
            await thead.thead.update(updateTheadDto);
            return {
                message: 'Thead updated successfully',
                thead: thead.thead,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update thead. Please try again later', error);
        }
    }
    async remove(clinic_id, id) {
        try {
            await this.repo.destroy({ where: { clinic_id, id } });
            return {
                message: 'Thead deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete thead. Please try again later', error);
        }
    }
};
exports.TheadService = TheadService;
exports.TheadService = TheadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(thead_model_1.Thead)),
    __metadata("design:paramtypes", [Object])
], TheadService);
//# sourceMappingURL=thead.service.js.map
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
exports.DirectionsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const direction_model_1 = require("./models/direction.model");
let DirectionsService = class DirectionsService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(clinic_id, createDirectionDto) {
        try {
            if (clinic_id !== createDirectionDto.clinic_id) {
                throw new common_1.BadRequestException('Clinic ID does not match the provided direction clinic ID');
            }
            const direction = await this.repo.create(createDirectionDto);
            return {
                message: 'Direction created successfully',
                direction,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create direction. Please try again later', error);
        }
    }
    async findAll(clinic_id) {
        try {
            const directions = await this.repo.findAll({ where: { clinic_id } });
            if (!directions || directions.length === 0) {
                throw new common_1.NotFoundException('No directions found for the specified clinic ID');
            }
            return {
                message: 'Directions retrieved successfully',
                directions,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve directions. Please try again later', error);
        }
    }
    async paginate(clinic_id, page) {
        try {
            page = Number(page);
            const limit = 15;
            const offset = (page - 1) * limit;
            const directions = await this.repo.findAll({
                where: { clinic_id },
                offset,
                limit,
            });
            if (!directions || directions.length === 0) {
                throw new common_1.NotFoundException('No directions found for the specified clinic ID');
            }
            const total_count = await this.repo.count({ where: { clinic_id } });
            const total_pages = Math.ceil(total_count / limit);
            return {
                status: 200,
                message: 'Directions retrieved successfully',
                data: {
                    records: directions,
                    pagination: {
                        currentPage: page,
                        total_pages,
                        total_count,
                    },
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve directions. Please try again later', error);
        }
    }
    async findOne(clinic_id, id) {
        try {
            const direction = await this.repo.findOne({
                where: { id, clinic_id },
                include: { all: true },
            });
            if (!direction) {
                throw new common_1.NotFoundException(`Direction with id ${id} not found in clinic ${clinic_id}`);
            }
            return {
                message: 'Direction retrieved successfully',
                direction,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to retrieve directions. Please try again later', error);
        }
    }
    async update(clinic_id, id, updateDirectionDto) {
        try {
            const direction = await this.findOne(clinic_id, id);
            await direction.direction.update(updateDirectionDto);
            return {
                message: 'Direction updated successfully',
                direction: direction.direction,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update direction. Please try again later', error);
        }
    }
    async remove(clinic_id, id) {
        try {
            await this.repo.destroy({ where: { clinic_id, id } });
            return {
                message: 'Direction deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete direction. Please try again later', error);
        }
    }
};
exports.DirectionsService = DirectionsService;
exports.DirectionsService = DirectionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(direction_model_1.Direction)),
    __metadata("design:paramtypes", [Object])
], DirectionsService);
//# sourceMappingURL=directions.service.js.map